import fs from 'fs';
import path from 'path';
export class ExerciseParser {
    srcPath;
    constructor(srcPath) {
        this.srcPath = srcPath;
    }
    /**
     * Parse a single exercise file and extract metadata
     */
    parseExercise(category, exerciseFile, solutionFile) {
        const exerciseContent = fs.readFileSync(exerciseFile, 'utf-8');
        const solutionContent = fs.readFileSync(solutionFile, 'utf-8');
        const number = this.extractNumber(path.basename(exerciseFile));
        const slug = `${category}-${number.padStart(2, '0')}`;
        const metadata = {
            slug,
            category,
            number,
            title: this.extractTitle(exerciseContent, solutionContent),
            description: this.extractDescription(exerciseContent),
            tags: this.extractTags(exerciseContent, solutionContent),
        };
        return {
            metadata,
            starterCode: this.extractStarterCode(exerciseContent),
            solutionCode: this.extractSolutionCode(solutionContent),
            testCases: this.extractTestCases(exerciseContent),
            imports: this.extractImports(exerciseContent),
        };
    }
    extractNumber(filename) {
        const match = filename.match(/^(\d+)/);
        return match ? match[1] : '01';
    }
    extractTitle(exerciseContent, solutionContent) {
        const functionMatch = exerciseContent.match(/const\s+(\w+)\s*=/);
        if (functionMatch) {
            return this.camelCaseToTitle(functionMatch[1]);
        }
        return 'Exercise';
    }
    extractDescription(content) {
        const lines = content.split('\n');
        const comments = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('//') || line.startsWith('*') || line.startsWith('/*')) {
                comments.push(line.replace(/^\/\/\s*|\*\s*|\/\*\s*|\*\/\s*/g, ''));
            }
        }
        return comments.join(' ').trim() || 'Complete the implementation';
    }
    extractStarterCode(content) {
        const functionMatch = content.match(/(const\s+\w+\s*=.*?=>\s*{[\s\S]*?});/);
        return functionMatch ? functionMatch[1] : '';
    }
    extractSolutionCode(content) {
        const functionMatch = content.match(/(export\s+const\s+\w+\s*=.*?=>\s*{[\s\S]*?});/);
        return functionMatch ? functionMatch[1] : '';
    }
    extractTestCases(content) {
        const testCases = [];
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
    extractImports(content) {
        const imports = [];
        const lines = content.split('\n');
        for (const line of lines) {
            if (line.trim().startsWith('import ')) {
                imports.push(line.trim());
            }
        }
        return imports;
    }
    extractTags(exerciseContent, solutionContent) {
        const tags = [];
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
        return [...new Set(tags)]; // Remove duplicates
    }
    camelCaseToTitle(camelCase) {
        return camelCase
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }
}
