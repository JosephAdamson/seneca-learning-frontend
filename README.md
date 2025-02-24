# Frontend challenge for Seneca Learning

## Stack
- React
- Typescript
- tailwindcss

## Assumptions/Notes/Design
- For the colour gradient choices I've explicitly stuck with the options presented in the figma and the demo video.

- I was in two minds about how the colour change should work as a user moves the toggles, I decided to stick with the four colour backgrounds from the demo video using a percentage threshold (number of 'right' answers) to dictate the color change. 

- Using a percentage threshold means that the user feed back (the color change) is not immediate for large numbers of toggles, however I think this makes it slightly more challenging and therefore more engaging?

- I changed the shape of the vertical toggles in mobile mode slightly.

- Extension tasks
    - I put the shuffling logic in a separate component that wraps around the toggle container to maintain some separation of concerns.

    - The two examples of the toggle components are wrapped in a component (purely for display purposes) that lets you switch between them just click the icon in the top right corner.

    - To make it more accessible each toggle has a keydown listener, on focus use the arrow keys (left and right for desktop and up and down for mobile) to switch between options.  