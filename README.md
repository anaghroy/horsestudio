# Horse Studio (Dogstudio Clone)

## 1. Introduction
Horse Studio is an immersive, interactive landing page inspired by the award-winning Dogstudio website. It combines the power of React, 3D WebGL graphics, and scroll-triggered animations to deliver a premium, multidisciplinary creative studio experience. 

### Technologies Used
- **React.js** (Frontend library)
- **Vite** (Build tool)
- **Three.js & React Three Fiber (R3F)** (3D rendering)
- **@react-three/drei** (Helper components for R3F)
- **GSAP & ScrollTrigger** (Complex animations & scroll tracking)
- **SCSS / Sass** (Styling)

## 2. Features: What Users Can Do?
- **Interactive 3D Experience:** View a 3D model rendered seamlessly into the background.
- **Scroll-Driven Storytelling:** Scroll down the page to trigger dynamic rotation and repositioning of the 3D model.
- **Dynamic Texture Morphing:** Hover over featured project titles to see the 3D model's texture smoothly morph into different stylized matcaps using custom shaders.
- **Ambient Atmosphere:** Experience background audio that plays upon first interaction and intelligently auto-pauses when the browser tab loses visibility.

## 3. Keyboard Shortcuts
- *Navigation is primarily scroll and mouse-driven.*
- **Scroll Down/Up:** Advance through the timeline and animate the 3D model.
- **Mouse Hover:** Preview dynamic materials on the featured projects list.

## 4. The Process: How I Built It
1. **Setup & Layout:** Initialized the project with Vite + React and structured the HTML/SCSS layout to match the original design.
2. **3D Canvas:** Implemented `@react-three/fiber` to create a fixed background canvas and imported the `.glb` 3D model using `@react-three/drei`.
3. **Custom Shaders:** Modified the `Three.js` material using `onBeforeCompile` to write a custom GLSL fragment shader. This allows the smooth blending of two matcap textures based on a progress variable.
4. **GSAP Integration:** Used `@gsap/react` and `ScrollTrigger` to link the scroll position to the model's rotation and position. Added DOM hover event listeners to trigger the texture morphing animations.
5. **Audio Management:** Created an audio component that listens for the first user interaction to comply with browser autoplay policies, and utilizes the Page Visibility API to pause/resume audio gracefully.

## 5. What I Learned
- Integrating **Three.js** in a React environment using **React Three Fiber**.
- Writing custom **GLSL Shaders** (`onBeforeCompile`) to achieve smooth texture transitions that aren't possible out-of-the-box.
- Synchronizing **GSAP ScrollTrigger** animations with a 3D canvas object.
- Handling browser audio autoplay policies and page visibility events effectively.
- Managing complex assets (multiple matcap textures, `.glb` models) in a React application.

## 6. How It Could Be Improved
- **Loading Screen (Suspense):** Add a preloader using React `Suspense` to ensure all heavy 3D models and textures are fully loaded before revealing the page.
- **Responsive Design:** Fine-tune the 3D camera positioning and CSS layout for smaller mobile and tablet devices.
- **Performance Optimization:** Compress the 3D model and textures further, and implement lazy loading to improve initial load times and frame rates.
- **Accessibility:** Add explicit keyboard navigation shortcuts and ARIA labels.

## 7. How to Run the Project
1. Clone the repository.
2. Ensure you have Node.js installed.
3. Open a terminal in the project directory and install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the local server URL provided in the terminal (usually `http://localhost:5173`).

## 8. Live Project Demo
[Insert Video/GIF/Link Here] *(Replace this placeholder with a link to your live demo, YouTube video, or GIF showing the interactions)*
