import WomanImg from "../../public/images/about/woman.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="section">
      <div className="container mx-auto h-full relative">
        {/* text & img wrapper */}
        <div className="flex flex-col lg:flex-row h-full items-center justify-center gap-x-24 text-center lg:text-left lg:pt-16">
          {/* image */}
          <div className="flex-1 max-h-96 lg:max-h-max order-2 lg:order-none overflow-hidden">
            <img
              src={WomanImg}
              alt="About Me"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* text */}
          <div className="flex-1 pt-12 lg:pt-0 z-10 flex flex-col justify-center items-center lg:items-start">
            <h1 className="h1">About Me</h1>
            <p className="mb-12 max-w-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore,
              <b>repellat quas eaque</b> laudantium odio ducimus!
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam, culpa natus aspernatur dolores voluptatum magni.
            </p>
            <Link to="/portfolio" className="btn">
              View my work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
