# Frontend challenge for Seneca Learning

The live demo is [here](https://josephadamson.github.io/seneca-learning-frontend/)

## Stack
- React
- Typescript
- tailwindcss

## Assumptions/Notes/Design
- For the colour gradient choices I've explicitly stuck with the options presented in the figma and the demo video.

- I was in two minds about how the colour change should work as a user moves the toggles, I decided to stick with the four colour backgrounds from the demo video using a percentage threshold (number of 'right' answers) to dictate the color change. 

- Using a percentage threshold means that in the event of lots of options the user would have to trigger proportion of 'right' answers to get a color change/indication they are on the right path. I think this makes it slightly more challenging and therefore more engaging?

- I changed the shape of the vertical toggles in mobile mode slightly.

- Extension tasks
    - I've included both versions of the toggle component (2 and 3 options) in the demo. Both are wrapped in a component (purely for display purposes) that lets you switch between them just click the icon in the top right corner.

    - To make it more accessible each toggle bar has a keydown listener. On focus use the arrow keys (left and right for desktop and up and down for mobile) to switch between options.  
