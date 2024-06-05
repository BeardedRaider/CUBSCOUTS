import React from "react";

<link rel="stylesheet" href="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/css/main.ad49aa9b.css" />

/*
This is the 'GameCard' component. It's a functional component that takes in props for an image, name, description, and link. 

The component returns a card with the game's image, name, and description. The image is displayed at the top of the card, with the name and description below it. At the bottom of the card, there's a "Play Now" button that links to the game's URL.

The card has various styling classes applied to it, such as padding, margin, and shadow for the card itself, and font size and color for the text. The image is displayed with a full height and width, and object-cover to maintain its aspect ratio while filling the element box.

The 'link' prop is used in an anchor tag to create a link that opens in a new tab (due to the 'target="_blank"' attribute) and mitigates the security risk of 'target="_blank"' with 'rel="noopener noreferrer"'.
*/
const GameCard = ({ image, name, description, link }) => {
  return (
    <>
    <section>
      
    </section>
    <div className="flex-none px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mt-20 mb-10">
      <div className="!z-5 relative flex flex-col rounded-[20px] h-96 bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex flex-row w-full !p-4 3xl:p-![8px] bg-white undefined">
        <div className="  w-full relative">
          <img src={image} className="h-full w-full rounded-xl object-cover" alt=""/>
        </div>
        <div className="mb-3 flex items-center justify-between px-1 md:items-start">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700"> {name}</p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">{description}</p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-auto">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <button className="text-white bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-brand-600 rounded-lg text-lg ">Play Now</button>
          </a>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default GameCard;


