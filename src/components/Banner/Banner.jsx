const Banner = () => {
  return (
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full h-[90vh]">
        <img
          src="https://i.ibb.co.com/Fbc7LRDJ/pexels-nathan-engel-50858-436413.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full h-[90vh]">
        <img
          src="https://i.ibb.co.com/YFHSqzJc/pexels-pixabay-275977.jpg"
          className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full h-[90vh]">
        <img
          src="https://i.ibb.co.com/JWt6d8h4/pexels-donaldtong94-66134.jpg"
          className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full h-[90vh]">
        <img
          src="https://i.ibb.co.com/VcbsRRkm/pexels-tima-miroshnichenko-5662857.jpg"
          className="w-full object-cover"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
