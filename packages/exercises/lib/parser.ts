import fs from 'fs';
import path from 'path';
import { Exercise, ExerciseMetadata, TestCase } from './types.js';

export class ExerciseParser {
  private srcPath: string;

  constructor(srcPath: string) {
    this.srcPath = srcPath;
  }

  /**
   * Parse a single exercise file and extract metadata
   */
  parseExercise(category: string, exerciseFile: string, solutionFile: string, testFile: string): Exercise {
    const exerciseContent = fs.readFileSync(exerciseFile, 'utf-8');
    const solutionContent = fs.readFileSync(solutionFile, 'utf-8');
    const testContent = fs.readFileSync(testFile, 'utf-8');
    
    const number = this.extractNumber(path.basename(exerciseFile));
    const filename = path.basename(exerciseFile);
    const slug = filename.replace('.exercise.ts', '');
    
    const metadata: ExerciseMetadata = {
      slug,
      category,
      number,
      title: this.extractTitle(exerciseContent, solutionContent),
      description: this.extractDescription(exerciseContent),
      difficulty: this.extractDifficulty(exerciseContent),
      tags: this.extractTags(exerciseContent, solutionContent),
      conceptTitle: this.extractConceptTitle(exerciseContent),
      goalStatement: this.extractGoalStatement(exerciseContent),
      conceptExplanation: this.extractConceptExplanation(exerciseContent),
      hints: this.extractHints(exerciseContent),
      successCriteria: this.extractSuccessCriteria(exerciseContent),
      estimatedTime: this.extractEstimatedTime(exerciseContent),
      theme: this.extractTheme(exerciseContent),
    };

    console.log('=== Parser debug for', slug, '===');
    console.log('Raw content first 500 chars:', exerciseContent.substring(0, 500));
    console.log('Extracted metadata:', {
      conceptTitle: metadata.conceptTitle,
      goalStatement: metadata.goalStatement,
      conceptExplanation: metadata.conceptExplanation,
      difficulty: metadata.difficulty,
      estimatedTime: metadata.estimatedTime,
      hints: metadata.hints,
      successCriteria: metadata.successCriteria,
      theme: metadata.theme,
    });
    console.log('=== End debug ===');

    return {
      metadata,
      starterCode: this.extractStarterCode(exerciseContent),
      solutionCode: this.extractSolutionCode(solutionContent),
      testCases: this.extractTestCases(testContent),
      imports: this.extractImports(exerciseContent),
      slug: metadata.slug,
      title: metadata.title,
      description: metadata.description,
      difficulty: metadata.difficulty,
      tags: metadata.tags,
      conceptTitle: metadata.conceptTitle,
      goalStatement: metadata.goalStatement,
      conceptExplanation: metadata.conceptExplanation,
      hints: metadata.hints,
      successCriteria: metadata.successCriteria,
      estimatedTime: metadata.estimatedTime,
    };
  }

  private extractNumber(filename: string): string {
    const match = filename.match(/^(\d+)/);
    return match ? match[1] : '01';
  }

  private extractTitle(exerciseContent: string, solutionContent: string): string {
    const conceptTitleMatch = exerciseContent.match(/\/\/\s*([^:]+):\s*(.+)/);
    if (conceptTitleMatch) {
      return conceptTitleMatch[2].trim();
    }
    
    const functionMatch = exerciseContent.match(/const\s+(\w+)\s*=/);
    if (functionMatch) {
      return this.camelCaseToTitle(functionMatch[1]);
    }
    return 'Exercise';
  }

  private extractDescription(content: string): string {
    const descriptionMatch = content.match(/\/\/\s*Description:\s*(.+)/);
    if (descriptionMatch) {
      return descriptionMatch[1].trim();
    }
    
    return 'Complete the implementation';
  }

  private extractStarterCode(content: string): string {
    const functionMatch = content.match(/(const\s+\w+\s*=.*?=>\s*{[\s\S]*?});/);
    return functionMatch ? functionMatch[1] : '';
  }

  private extractSolutionCode(content: string): string {
    const functionMatch = content.match(/(export\s+const\s+\w+\s*=.*?=>\s*{[\s\S]*?});/);
    return functionMatch ? functionMatch[1] : '';
  }

  private extractTestCases(content: string): TestCase[] {
    const testCases: TestCase[] = [];
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('describe(')) {
        const describeMatch = line.match(/describe\(['"`]([^'"`]+)['"`]/);
        if (describeMatch) {
          testCases.push({
            description: describeMatch[1],
            code: line,
            type: 'describe',
          });
        }
      }
      
      if (line.startsWith('it(')) {
        const itMatch = line.match(/it\(['"`]([^'"`]+)['"`]/);
        if (itMatch) {
          let testCode = line;
          let j = i + 1;
          let braceCount = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
          
          while (j < lines.length && braceCount > 0) {
            const nextLine = lines[j];
            testCode += '\n' + nextLine;
            braceCount += (nextLine.match(/{/g) || []).length - (nextLine.match(/}/g) || []).length;
            j++;
          }
          
          testCases.push({
            description: itMatch[1],
            code: testCode,
            type: 'it',
          });
        }
      }
    }
    
    return testCases;
  }

  private extractImports(content: string): string[] {
    const imports: string[] = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      if (line.trim().startsWith('import ')) {
        imports.push(line.trim());
      }
    }
    
    return imports;
  }

  private extractTags(exerciseContent: string, solutionContent: string): string[] {
    const tags: string[] = [];
    
    const fptsImports = exerciseContent.match(/from\s+['"`]fp-ts\/(\w+)['"`]/g);
    if (fptsImports) {
      fptsImports.forEach(imp => {
        const match = imp.match(/fp-ts\/(\w+)/);
        if (match) {
          tags.push(match[1].toLowerCase());
        }
      });
    }
    
    const functionCalls = solutionContent.match(/\b(some|none|fold|map|filter|chain|fromNullable|toNullable|getOrElse)\b/g);
    if (functionCalls) {
      functionCalls.forEach(fn => {
        if (!tags.includes(fn.toLowerCase())) {
          tags.push(fn.toLowerCase());
        }
      });
    }
    
    return Array.from(new Set(tags)); // Remove duplicates
  }

  private extractDifficulty(content: string): 'easy' | 'medium' | 'hard' {
    const difficultyMatch = content.match(/^\/\/\s*Difficulty:\s*(easy|medium|hard)$/mi);
    if (difficultyMatch) {
      return difficultyMatch[1].toLowerCase() as 'easy' | 'medium' | 'hard';
    }
    return 'easy';
  }

  private extractConceptTitle(content: string): string | undefined {
    const lines = content.split('\n');
    for (const line of lines) {
      const conceptMatch = line.match(/^\/\/\s*([^:]+):\s*(.+)$/);
      if (conceptMatch) {
        return conceptMatch[2].trim();
      }
    }
    return undefined;
  }

  private extractGoalStatement(content: string): string | undefined {
    const goalMatch = content.match(/^\/\/\s*Goal:\s*(.+)$/m);
    return goalMatch ? goalMatch[1].trim() : undefined;
  }

  private extractConceptExplanation(content: string): string | undefined {
    const conceptMatch = content.match(/^\/\/\s*Concept:\s*(.+)$/m);
    return conceptMatch ? conceptMatch[1].trim() : undefined;
  }

  private extractHints(content: string): string[] | undefined {
    const hints: string[] = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      const hintMatch = line.match(/\/\/\s*(\d+\..*)/);
      if (hintMatch) {
        hints.push(hintMatch[1].trim());
      }
    }
    
    return hints.length > 0 ? hints : undefined;
  }

  private extractSuccessCriteria(content: string): string[] | undefined {
    const criteria: string[] = [];
    const lines = content.split('\n');
    let inCriteriaSection = false;
    
    for (const line of lines) {
      if (line.includes('Success criteria') || line.includes('TODO:')) {
        inCriteriaSection = true;
        continue;
      }
      
      if (inCriteriaSection && line.trim().startsWith('//')) {
        const criteriaMatch = line.match(/\/\/\s*(.+)/);
        if (criteriaMatch && !criteriaMatch[1].includes('Return') && !criteriaMatch[1].includes('TODO')) {
          criteria.push(criteriaMatch[1].trim());
        }
      }
    }
    
    return criteria.length > 0 ? criteria : undefined;
  }

  private extractEstimatedTime(content: string): number | undefined {
    const timeMatch = content.match(/^\/\/\s*Time:\s*(\d+)$/mi);
    return timeMatch ? parseInt(timeMatch[1]) : undefined;
  }

  private extractTheme(content: string): string | undefined {
    const themeMatch = content.match(/^\/\/\s*Theme:\s*(\w+)$/mi);
    return themeMatch ? themeMatch[1].toLowerCase() : undefined;
  }

  private camelCaseToTitle(camelCase: string): string {
    return camelCase
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }
}
