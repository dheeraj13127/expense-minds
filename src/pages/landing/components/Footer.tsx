const Footer = () => {
  return (
    <div className="grid grid-cols-12 bg-black">
      <div className="col-span-12 py-8 ">
        <p className=" font-poppins text-center text-white">
          Made with ❤️ by{" "}
          <a
            href="https://dheeraj-develops.vercel.app"
            target="_blank"
            rel="noopeneer"
            className=" font-semibold cursor-pointer"
          >
            Dheeraj
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
