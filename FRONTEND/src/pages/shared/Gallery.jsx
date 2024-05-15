import React from 'react'

const Gallery = () => {
  return (
    <div>
      <section className='sectionBg'>
        <div className='text-white py-8 mt-20'>
          <div className='container mx-auto flex flex-col md:flex-row items-center my-12 md:my-20'>
            <div className='flex flex-col w-full lg:w-1/2 justify-center items-start p-4'>
              <h1 className='text-3xl md:text-5xl p-1 text-white tracking-loose'>Welcome!
              </h1>
              <h2 className='text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2'>To Obanshire Cub Scouts</h2>
              <p className='text-2xl text-gray-50 mb-4'>
                Come and join a fun and exciting adventure with Obanshire Cub Scouts. We have a range of activities and events for all ages.
              </p>
              <a href="/login"
              className='bg-transparent hover:bg-yellow-400 text-yellow-400 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-400 hover:border-transparent'>Login Now</a>
            </div>
          </div>
        </div>
      </section>
    <div class="container mx-auto p-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="grid gap-2">
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://upload.wikimedia.org/wikipedia/commons/0/03/Kashi_Vishwanath_Temple_Banaras.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://pbs.twimg.com/media/FGRnUzPVEAAbqM8?format=jpg&name=large"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://pbs.twimg.com/media/FGRnUzPVEAAbqM8?format=jpg&name=large"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://pbs.twimg.com/media/FGRnUzPVEAAbqM8?format=jpg&name=large"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://pbs.twimg.com/media/FGRnNpAVUAYqRYv?format=jpg&name=large"
                  alt=""
                />
              </div>
            </div>
            <div class="grid gap-2">
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://pbs.twimg.com/media/FGRnP_TUUAAttG3?format=jpg&name=large"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://i.pinimg.com/originals/c0/7d/17/c07d17d7ca0b9f39f5aded4b6dca8f02.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Benares-_The_Golden_Temple%2C_India%2C_ca._1915_%28IMP-CSCNWW33-OS14-66%29.jpg/1280px-Benares-_The_Golden_Temple%2C_India%2C_ca._1915_%28IMP-CSCNWW33-OS14-66%29.jpg"
                  alt=""
                />
              </div>
            </div>
            <div class="grid gap-2">
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://www.jagranimages.com/images/newimg/27072020/27_07_2020-shri-kashi-vishwanath-temple_20557350.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://www.jansatta.com/wp-content/uploads/2021/12/Kashi-Vishwanath-Mandir.png?w=1024"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://staticimg.amarujala.com/assets/images/2021/11/07/750x506/kashi-vishwanath-dham_1636258507.jpeg?w=674&dpr=1.0"
                  alt=""
                />
              </div>
            </div>
            <div class="grid gap-2">
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://staticimg.amarujala.com/assets/images/2020/01/13/750x506/kashi-vishwanath-mandir-varanasi_1578924152.png?w=700&dpr=2.0"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/800px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://upload.wikimedia.org/wikipedia/commons/2/25/Chet_Singh_Ghat_in_Varanasi.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Gallery