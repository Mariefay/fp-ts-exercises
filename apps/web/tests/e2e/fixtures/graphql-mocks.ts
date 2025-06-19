import { test as base } from '@playwright/test';
import { mockCategories, mockExercises, mockProgress, mockProgressDashboard } from './mock-data';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route('**/graphql', async (route) => {
      const request = route.request();
      const postData = request.postData();
      
      console.log('GraphQL route intercepted:', request.url());
      
      if (!postData) {
        console.log('No post data, continuing...');
        await route.continue();
        return;
      }

      const body = JSON.parse(postData);
      const { query, variables } = body;
      
      console.log('GraphQL query:', query.substring(0, 100) + '...');
      console.log('GraphQL variables:', variables);

      if (query.includes('GetCategories')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              getCategories: mockCategories
            }
          })
        });
      } else if (query.includes('GetExercisesByCategory')) {
        const categorySlug = variables?.category;
        const categoryExercises = Object.values(mockExercises).filter(
          exercise => exercise.category === categorySlug
        );
        
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              getExercisesByCategory: categoryExercises
            }
          })
        });
      } else if (query.includes('GetExerciseBySlug')) {
        const exerciseSlug = variables?.slug;
        const exercise = mockExercises[exerciseSlug as keyof typeof mockExercises];
        
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              getExerciseBySlug: exercise || null
            }
          })
        });
      } else if (query.includes('GetProgress')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              getProgress: mockProgress.progressData
            }
          })
        });
      } else if (query.includes('GetProgressDashboard')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              getProgressDashboard: mockProgressDashboard
            }
          })
        });
      } else if (query.includes('CreateSession')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              createSession: 'test-session-123'
            }
          })
        });
      } else if (query.includes('ValidateSession')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              validateSession: true
            }
          })
        });
      } else if (query.includes('MarkExerciseComplete')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              markExerciseComplete: true
            }
          })
        });
      } else {
        await route.continue();
      }
    });

    await use(page);
  }
});

export { expect } from '@playwright/test';
