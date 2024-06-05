// importing various components from react, components and other packages
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GameCard from "../../components/GameCard";
import gameData from "../../games.json";
import UserInformation from '../../UserInfo';
import "../../styles/games.css";

const Games = () => {
  // This object is used to configure the behavior of the slider. It specifies the number of slides to show at a time, the number of slides to scroll, and the breakpoints at which the number of slides to show changes. The 'responsive' property is an array of objects that specify the number of slides to show at different screen sizes. The 'dots' property is set to 'false' to hide the navigation dots at the bottom of the slider. The 'infinite' property is set to 'true' to allow infinite scrolling of the slides. The 'speed' property specifies the speed of the slide transition in milliseconds. The 'swipeToSlide' property is set to 'true' to allow swiping to navigate between slides. The 'initialSlide' property is set to 2 to start the slider at the third slide. The 'slidesToShow' property is set to 4 to show 4 slides at a time on larger screens. The 'slidesToScroll' property is set to 1 to scroll one slide at a time. The 'breakpoint' property is used to specify the screen width at which the settings should change. The 'settings' object is passed as a prop to the 'Slider' component to configure its behavior.
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 810,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // This function is responsible for rendering the welcome section of the page. It displays a welcome message and the user's first name. The 'UserInformation' component is used to get the user's information from the context.
    const user = UserInformation()
  return (
    <>
    <section  class=" sectionWelcome py-24 px-4 lg:px-16"> 
      <div class="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2">
        <h1 class=" text-white text-center text-5xl pb-12">
          Welcome
        </h1>
        <h2 className="text-white text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2">{user ? user.name : 'Loading...'}!
        </h2>
      </div>
    </section>

    {/* ---------Sub weclome--------- */}
    <section className='subIntro bg-purple-800 '>
      <div className=" py-20 ml-10">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <div className="max-w-xl">
            <h2 className="font-black text-yellow-300 text-3xl mb-4">Ready for some fun?.</h2>
            <p className='text-yellow-400 text-2xl '>Here you can explore the games on offer! Just tap game you like and off you go!</p>
          </div>  
        </div>
      </div>
    
      
      {/* ---------Game card slider--------- */}
      
{/* This section of the code is responsible for rendering a slider with game cards. The 'Slider' component takes a settings object to configure its behavior. For each game in the 'gameData' array, a 'GameCard' component is rendered inside the slider. Each 'GameCard' displays the game's image, name, description, and a link to the game. The 'key' prop given to each 'div' in the map function is the index of the game in the 'gameData' array. */}

    <Slider {...settings}>
      {gameData.map((game, index) => (
        <div key={index} className="px-2">
          <div style={{ width: "85vw", height: "auto" }}>
            <GameCard
              image={game.image}
              name={game.name}
              description={game.description}
              link={game.link}
            />
          </div>
        </div>
      ))}
    </Slider>
    </section>
  </>
  );
};

export default Games;