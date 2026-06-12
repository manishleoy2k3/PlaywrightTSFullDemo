# Storage State Authentication Setup

## Overview

This project uses Playwright's **Storage State** feature to persist user authentication between tests. Instead of logging in every test, sessions are authenticated once during setup and reused.

## How It Works

### 1. **Global Setup (`globals/auth-setup.ts`)**

- Runs **once** before all tests
- Authenticates as user and admin
- Saves authentication state (cookies, localStorage, sessionStorage) to files:
  - `storage-state/user-auth.json` ← User session
  - `storage-state/admin-auth.json` ← Admin session

### 2. **Custom Fixtures (`src/fixture/TestFixture.ts`)**

Provides pre-authenticated fixtures:

| Fixture                     | Purpose                        | Usage                     |
| --------------------------- | ------------------------------ | ------------------------- |
| `homePage`                  | Regular HomePage (no auth)     | Testing login flows       |
| `authenticatedHomePage`     | HomePage with user session     | Tests that need user role |
| `userPage`                  | Raw page with user auth        | Custom test logic         |
| `adminPage`                 | Raw page with admin auth       | Admin-specific tests      |
| `authenticatedResultPage`   | ResultPage with user session   | Testing results as user   |
| `authenticatedPlaylistPage` | PlaylistPage with user session | Testing playlists as user |

### 3. **Configuration (`playwright.config.ts`)**

- Enabled `globalSetup: './globals/auth-setup.ts'`
- Runs setup once before test suite

## Setup Instructions

### Step 1: Configure Environment Variables

Create/update your `.env` file:

```env
# User credentials
USER_EMAIL=user@example.com
USER_PASSWORD=your_password

# Admin credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password

# Application URL
ORG_URL=https://login.microsoftonline.com
```

### Step 2: Run Tests (First Time)

```bash
npx playwright test
```

**What happens:**

1. ✅ Auth setup runs → Authenticates users
2. ✅ Storage files created in `storage-state/`
3. ✅ Tests use pre-authenticated sessions

### Step 3: Refresh Authentication (When Needed)

If credentials change or sessions expire:

```bash
# Force re-authentication by deleting storage files
rm storage-state/*.json

# Run tests again to re-authenticate
npx playwright test
```

## Usage Examples

### Example 1: Test with Pre-Authenticated User

```typescript
test("User dashboard loads", async ({ authenticatedHomePage }) => {
  // ✅ User is already logged in via storage state

  await authenticatedHomePage.page.goto("/dashboard");

  // Verify dashboard content
  // No login steps needed!
});
```

### Example 2: Test with Admin Permissions

```typescript
test("Admin can manage users", async ({ adminPage }) => {
  // ✅ Admin is already authenticated

  await adminPage.goto("/admin/users");

  // Test admin features
  // const userCount = await adminPage.locator('.user-row').count();
  // expect(userCount).toBeGreaterThan(0);
});
```

### Example 3: Mix Authenticated and Regular Tests

```typescript
test.describe("Auth Flow", () => {
  test("Login page displays", async ({ homePage }) => {
    // ❌ Regular fixture - not authenticated
    // Good for testing login flows

    await homePage.page.goto("/login");
  });

  test("Dashboard accessible after login", async ({
    authenticatedHomePage,
  }) => {
    // ✅ Authenticated fixture
    // Skips login, goes directly to dashboard

    await authenticatedHomePage.page.goto("/dashboard");
  });
});
```

## File Structure

```
storage-state/
  ├── user-auth.json          ← User session (created by setup)
  └── admin-auth.json         ← Admin session (created by setup)

globals/
  ├── auth-setup.ts           ← New: Runs before tests
  ├── global-setup.ts         ← Existing
  └── global-teardown.ts      ← Existing

src/
  └── fixture/
      └── TestFixture.ts      ← Updated: Added authenticated fixtures

tests/
  ├── Chapter07/
  │   └── 01_AuthenticatedFixtures_Example.spec.ts  ← Examples
  └── ...existing tests
```

## Benefits

| Benefit                  | Time Saved                |
| ------------------------ | ------------------------- |
| No login step per test   | 20-30 seconds per test ⏱️ |
| Parallel test execution  | ~5-10 seconds per shard   |
| Faster CI/CD pipelines   | 30-40% faster overall     |
| Reduced flaky auth tests | More stable test suite ✅ |

## Storage State Contents

Each `.json` file contains:

- **Cookies** - Session tokens, CSRF tokens
- **localStorage** - User preferences, tokens
- **sessionStorage** - Temporary session data
- **Origins** - Associated URLs

Example:

```json
{
  "cookies": [
    {
      "name": "token",
      "value": "eyJhbGc...",
      "domain": "example.com",
      ...
    }
  ],
  "origins": [...]
}
```

## Troubleshooting

### ❌ Error: "Storage state file not found"

**Solution:** Run setup again to generate files:

```bash
npx playwright test --headed  # See login in action
```

### ❌ Error: "Session expired"

**Solution:** Delete storage files and re-authenticate:

```bash
rm storage-state/*.json
npx playwright test
```

### ❌ Tests still logging in

**Solution:** Use authenticated fixture names:

```typescript
// ❌ Wrong
async ({ homePage }) => { ... }

// ✅ Correct
async ({ authenticatedHomePage }) => { ... }
```

### ❌ Wrong user authenticated

**Solution:** Check `.env` file has correct credentials:

```bash
cat .env  # Verify USER_EMAIL, USER_PASSWORD, etc.
```

## CI/CD Integration

For GitHub Actions, add to your workflow:

```yaml
- name: Run authenticated tests
  run: |
    # Storage state files will be created during setup
    npx playwright test

    # Optional: Cache storage state between runs
    # (Not recommended if sessions are short-lived)
```

## Security Notes

⚠️ **Important:**

- Store credentials in **environment variables**, not in code
- Add `storage-state/*.json` to `.gitignore` (contains session tokens)
- Use separate credentials for test/production environments
- Rotate test credentials periodically

Example `.gitignore`:

```
storage-state/
.env
*.json
```

## Next Steps

1. ✅ Set environment variables in `.env`
2. ✅ Run tests to generate storage state files
3. ✅ Use authenticated fixtures in your tests
4. ✅ Check example test: `tests/Chapter07/01_AuthenticatedFixtures_Example.spec.ts`

---

**Questions?** Refer to:

- [Playwright Storage State Docs](https://playwright.dev/docs/auth)
- [Playwright Fixtures Docs](https://playwright.dev/docs/test-fixtures)
