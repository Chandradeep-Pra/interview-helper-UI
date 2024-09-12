import React from 'react';

const Cardtest = () => {
  const mockTest = [
    {
        cName: "Headout",
        position: "Frontend Developer",
        tags: ["Javascript", "DSA", "ReactJS"],
        source:"https://play-lh.googleusercontent.com/BisiPKPzSLx_0A27Yh1UjPPMBoblgFT9F65vCuNf4-kd2eaj_0RSdqink8-FAbOKGR2Z=w480-h960-rw"
    },
    {
        cName: "Google",
        position: "Software Engineer",
        tags: ["Python", "Algorithms"],
        source:"https://w0.peakpx.com/wallpaper/750/138/HD-wallpaper-google-amoled-black-google-logo-oled.jpg"
    },
    {
        cName: "Microsoft",
        position: "Backend Developer",
        tags: ["C#", ".NET", "SQL"],
        source:"https://wallpapercave.com/wp/wp6810852.png"
    },
    {
        cName: "Amazon",
        position: "Full Stack Developer",
        tags: ["Java", "Spring Boot", "AWS"],
        source:"https://images.unsplash.com/photo-1649734926695-1b1664e98842?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://storage.googleapis.com/gweb-uniblog-publish-prod/images/logo_Google_FullColor_3x_830x271px.original.png"
    },
    {
        cName: "Facebook",
        position: "UI/UX Designer",
        tags: ["Figma", "CSS", "JavaScript"],
        source:"https://images8.alphacoders.com/689/689599.png"
    },
    {
        cName: "Apple",
        position: "Data Scientist",
        tags: ["R", "Statistics", "Big Data"],
        source:"https://wallpaper.forfun.com/fetch/bb/bb2a4827ee97889d0b4f99eb29253bb6.jpeg?h=900&r=0.5"
    },
    {
        cName: "HashedIn",
        position: "DevOps Engineer",
        tags: ["Docker", "Kubernetes", "CI/CD"],
        source:"https://scontent.fccu10-1.fna.fbcdn.net/v/t39.30808-6/301913391_468368545305443_6860377780531992058_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=I55DUNq4AKkQ7kNvgHSSM0_&_nc_ht=scontent.fccu10-1.fna&oh=00_AYA2oAjc3k9-CLsKL6QX9cirNSBWLelXBYvvGhP6GO_X2w&oe=66E9132C"
    },
    {
        cName: "Netflix",
        position: "Mobile Developer",
        tags: ["Swift", "Kotlin", "React Native"],
        source:"https://wallpaperaccess.com/full/712410.jpg"
    },
    
  ];

  return (
    <div className='flex flex-wrap gap-4 '>
      {mockTest.map((item, index) => (
        <div key={index} className='h-[250px] w-[220px] rounded-lg bg-black px-2 py-1 flex flex-col justify-around'>
          <img
            src={item.source}
            alt="Company"
            className='w-full h-1/2 object-cover rounded-t-lg'
          />
          <div className='flex flex-col mt-2'>
            <span className='text-white font-normal text-sm'>{item.position}</span>
            <span className='font-normal text-xs text-gray-400'>{item.cName}</span>
          </div>
          <div className='mt-2 flex gap-2 flex-wrap'>
            <span className='text-white text-xs'>Tags:</span>
            {item.tags.map((tag, tagIndex) => (
              <div key={tagIndex} className={`text-xs rounded-full px-1 ${getTagStyle(tag)}`}>
                {tag}
              </div>
            ))}
          </div>
          <div className='bg-[#6EC531] hover:bg-green-600 cursor-pointer rounded-md text-center text-white mt-2'>
            Practice Mock
          </div>
        </div>
      ))}
    </div>
  );
};

// Utility function to get tag styles based on the tag content
const getTagStyle = (tag) => {
  switch (tag) {
    case 'Javascript':
      return 'bg-yellow-300 text-yellow-800';
    case 'DSA':
      return 'bg-orange-300 text-orange-800';
    case 'ReactJS':
      return 'bg-blue-300 text-blue-800';
    case 'Python':
      return 'bg-blue-300 text-blue-800';
    case 'Algorithms':
      return 'bg-green-300 text-green-800';
    case 'Machine Learning':
      return 'bg-purple-300 text-purple-800';
    case 'C#':
      return 'bg-gray-300 text-gray-800';
    case '.NET':
      return 'bg-teal-300 text-teal-800';
    case 'SQL':
      return 'bg-red-300 text-red-800';
    default:
      return 'bg-gray-300 text-gray-800';
  }
};

export default Cardtest;
