# Make the landing GIF work on Vercel

## Confirmed cause
The page currently loads the GIF from a Lovable-only `/_ _l5e/assets-v1/...` path (without the space). That path is served in Lovable previews but is not packaged into a Vercel deployment.

## Changes
- Add the original uploaded GIF to the app's bundled image assets so Vite includes it in production output.
- Replace the Lovable asset-pointer import with the bundled GIF import.
- Preserve the current behavior exactly: it remains behind only the first screen and disappears after “Enter the maze.”
- Remove the now-unused pointer file from the project.

## Verification
- Confirm the production build completes successfully.
- Open the app locally and verify the GIF appears on the first screen, then disappears after entering the quiz.
- Confirm the rendered GIF URL points to a packaged build asset rather than the Lovable-only asset path.
