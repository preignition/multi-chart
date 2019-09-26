import { html } from 'lit-element';
export const pattern =  html `
    <!-- we include patterns in the template so as to be able to use them in css (mask: url(#mask-stripe-thick)) -->
    <svg style="position:absolute; top:-100000px;" viewBox="0 0 1000 1000">
      <defs>
        <pattern id="pattern-stripe" width="5" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <rect width="0.5" height="4" transform="translate(0,0)" fill="white"></rect>
        </pattern>
        <pattern id="pattern-stripe-thick" width="5" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <rect width="2.5" height="4" transform="translate(0,0)" fill="white"></rect>
        </pattern>
        <pattern id="pattern-stripe-light" width="5" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <rect width="4" height="4" transform="translate(0,0)" fill="white"></rect>
        </pattern>
        <pattern id="pattern-stripe-hor" width="5" height="4" patternUnits="userSpaceOnUse">
          <rect width="0.5" height="4" transform="translate(0,0)" fill="white"></rect>
        </pattern>
        <pattern id="pattern-stripe-inverse" width="5" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="0.5" height="4" transform="translate(0,0)" fill="white"></rect>
        </pattern>
        <pattern id="pattern-stripe-thick-inverse" width="5" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="2.5" height="4" transform="translate(0,0)" fill="white"></rect>
        </pattern>
        <mask id="mask-stripe">
          <rect x="-200" y="-200" width="10000" height="10000" fill="url(#pattern-stripe)"></rect>
        </mask>
        <mask id="mask-stripe-thick">
          <rect x="-200" y="-200" width="10000" height="10000" fill="url(#pattern-stripe-thick)"></rect>
        </mask>
          <mask id="mask-stripe-light">
          <rect x="-200" y="-200" width="10000" height="10000" fill="url(#pattern-stripe-light)"></rect>
        </mask>
        <mask id="mask-stripe-inverse">
          <rect x="-200" y="-200" width="10000" height="10000" fill="url(#pattern-stripe-inverse)"></rect>
        </mask>
        <mask id="mask-stripe-thick-inverse">
          <rect x="-200" y="-200" width="10000" height="10000" fill="url(#pattern-stripe-thick-inverse)"></rect>
        </mask>
        <mask id="mask-stripe-hor">
          <rect x="-200" y="-200" width="10000" height="10000" fill="url(#pattern-stripe-hor)"></rect>
        </mask>
      </defs>
    </svg>`;