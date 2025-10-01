# Debugging Blank Page Issues in Next.js

## Current Status
✅ **Development server is running successfully**
- Server: http://localhost:3000
- Status: Ready in 1450ms
- No TypeScript errors
- All dependencies installed correctly

## Common Causes of Blank Pages

### 1. **JavaScript Errors in Browser Console**
**Check this first:**
1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for any red error messages
4. Check Network tab for failed requests

### 2. **Component Import/Export Issues**
**Symptoms:** Blank page with no errors in console
**Check:**
- All components are properly exported as default
- Import paths are correct
- No circular dependencies

### 3. **CSS/Styling Issues**
**Symptoms:** Content exists but invisible
**Check:**
- Tailwind CSS is loading properly
- No conflicting styles
- Font loading issues

### 4. **Data Loading Issues**
**Symptoms:** Page loads but no content
**Check:**
- JSON data is valid
- Data filtering is working
- No undefined/null data causing crashes

## Step-by-Step Debugging

### Step 1: Check Browser Console
```javascript
// Open browser console and look for:
// - Red error messages
// - Failed network requests
// - JavaScript runtime errors
```

### Step 2: Verify Component Rendering
Add temporary debug logs to components:

```tsx
// In app/page.tsx, add at the top of the component:
export default function Home() {
  console.log('Home component rendering');
  const news = newsData as NewsItem[];
  console.log('News data:', news.length, 'items');
  
  // Rest of component...
}
```

### Step 3: Check Network Requests
1. Open Network tab in dev tools
2. Refresh the page
3. Look for:
   - Failed requests (red status codes)
   - Missing resources
   - Slow loading assets

### Step 4: Test Individual Components
Create a minimal test page:

```tsx
// Create app/test/page.tsx
export default function TestPage() {
  return (
    <div>
      <h1>Test Page</h1>
      <p>If you can see this, the basic setup is working.</p>
    </div>
  );
}
```

### Step 5: Check for Hydration Issues
Look for hydration mismatch errors in console:
- Server-side rendering vs client-side rendering differences
- Date/time formatting issues
- Random values that differ between server and client

## Quick Fixes

### Fix 1: Clear Browser Cache
```bash
# Hard refresh the page
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

### Fix 2: Check for Ad Blockers
- Disable ad blockers temporarily
- Check if any extensions are blocking content

### Fix 3: Try Different Browser
- Test in incognito/private mode
- Try a different browser entirely

### Fix 4: Check Port Conflicts
```bash
# If port 3000 is busy, try a different port
npm run dev -- -p 3001
```

## Advanced Debugging

### Enable Next.js Debug Mode
```bash
# Add to package.json scripts
"dev:debug": "DEBUG=* npm run dev"
```

### Check Build Output
```bash
# Build the project to see if there are build-time errors
npm run build
```

### Verify Environment Variables
```bash
# Check if any environment variables are missing
echo $NODE_ENV
```

## Common Solutions

### Solution 1: Component Error Boundary
Add error boundary to catch component errors:

```tsx
// components/ErrorBoundary.tsx
'use client';
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### Solution 2: Minimal Page Test
Replace the entire page content temporarily:

```tsx
// app/page.tsx - minimal version
export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>This is a test page</p>
    </div>
  );
}
```

### Solution 3: Check Font Loading
```tsx
// Temporarily remove custom fonts from layout.tsx
// Test if fonts are causing the issue
```

## When to Use Each Debugging Step

1. **Start with browser console** - Most issues show up here
2. **Check network requests** - For loading issues
3. **Test minimal components** - To isolate the problem
4. **Use error boundaries** - For component crashes
5. **Check build output** - For compilation issues

## Getting Help

If none of these steps resolve the issue:
1. Take a screenshot of the browser console
2. Note any error messages
3. Check the Network tab for failed requests
4. Try the minimal page test
5. Report the specific error messages found


