import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { ChakraProvider, Button, Flex, Link, VStack, extendTheme } from '@chakra-ui/react';
import TopRight from './components/TopRight';
import PunkIcon from "./components/Icon";
import 'keen-slider/keen-slider.min.css';
import './styles.css';
import { NoiseOverlay } from './components/NoiseOverlay';
import { mode } from '@chakra-ui/theme-tools';

const myTheme = extendTheme({
  config: {
	useSystemColorMode: false,
	
  },
  colors: {
	  green: '#00FF46',
	  blue: '#0075FF',
	  orange: '#FF7F00',
	  yellow: '#FFFF00',
	  chartreuse: '#B5FF00',
	  pink: '#FF00C4',
	  darkback: '#192817'
  }
});

const Zorb = () => (
  <svg width="693" height="693" viewBox="0 0 693 693" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 346.5C0 537.587 155.413 693 346.5 693C537.587 693 693 537.587 693 346.5C692.823 155.413 537.411 0 346.5 0C155.413 0 0 155.413 0 346.5Z" fill="url(#paint0_radial)"/>
  <defs>
  <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(450.164 168.797) scale(521.764)">
  <stop offset="0.15625" stop-color="#DCC8D0"/>
  <stop offset="0.302083" stop-color="#78C8CF"/>
  <stop offset="0.427083" stop-color="#4D959E"/>
  <stop offset="0.557292" stop-color="#305EB9"/>
  <stop offset="0.796875" stop-color="#311F12"/>
  <stop offset="0.90625" stop-color="#563E34"/>
  <stop offset="1" stop-color="#2D1C13"/>
  </radialGradient>
  </defs>
  </svg>
);

const posters = [
  {
	id: 1,
	backgroundColor: 'pink',
	hoverColor: 'chartreuse',
	href: 'https://create.zora.co/collections/0x6056d7d72830eec9e72e9969f25f5baa754c1434',
  },
  {
	id: 2,
	backgroundColor: 'green',
	hoverColor: 'pink',
	href: 'https://create.zora.co/collections/0xf09b5a90903afc0f6e19437d0e18f9710e7b1d3e',
  },
  {
	id: 3,
	backgroundColor: 'lightgray',
	hoverColor: 'yellow',
	href: 'https://create.zora.co/collections/0x0797215f34bcf6e3770e48a76d1978a0cf67b6e6',
  },
  {
	id: 4,
	backgroundColor: 'blue',
	hoverColor: 'white',
	href: 'https://create.zora.co/collections/0x3462150aff5724e2d74d3118b7ffd6e963536ddd',
  },
  {
	id: 5,
	backgroundColor: 'chartreuse',
	hoverColor: 'pink',
	href: 'https://create.zora.co/collections/0x892e712e7917c06bf3b73260c7a535ec006512d6',
  },
  {
	id: 6,
	backgroundColor: 'orange',
	hoverColor: 'yellow',
	href: 'https://create.zora.co/collections/0x058905fde701d598a9922751478e9c3c7e19bf16',
  },
  {
	id: 7,
	backgroundColor: 'green',
	hoverColor: 'pink',
	href: 'https://create.zora.co/collections/0x8b50cb0efe5a278367499c0932e6627048473647',
  },
  {
	id: 8,
	backgroundColor: 'orange',
	hoverColor: 'pink',
	href: 'https://zora.co/collect/eth:0x67524c0d89d02bdf6ddff96125d785a666f810dc',
  },
];


const WheelControls = (slider) => {
  let touchTimeout;
  let position;
  let wheelActive;

  function dispatch(e, name) {
	position.x -= e.deltaX;
	position.y -= e.deltaY;
	slider.container.dispatchEvent(
	  new CustomEvent(name, {
		detail: {
		  x: position.x,
		  y: position.y
		}
	  })
	);
  }

  function wheelStart(e) {
	position = {
	  x: e.pageX,
	  y: e.pageY
	};
	dispatch(e, "ksDragStart");
  }

  function wheel(e) {
	dispatch(e, "ksDrag");
  }

  function wheelEnd(e) {
	dispatch(e, "ksDragEnd");
  }

  function eventWheel(e) {
	e.preventDefault();
	if (!wheelActive) {
	  wheelStart(e);
	  wheelActive = true;
	}
	wheel(e);
	clearTimeout(touchTimeout);
	touchTimeout = setTimeout(() => {
	  wheelActive = false;
	  wheelEnd(e);
	}, 50);
  }

  slider.on("created", () => {
	slider.container.addEventListener("wheel", eventWheel, {
	  passive: false
	});
  });
};



export default function App() {
  const [sliderRef] = useKeenSlider({
	mode: 'free',
	loop: true,
	rubberband: false,
	overflow: 'scroll',
	vertical: true,
	},
  [WheelControls]
);

const [scrollPosition, setScrollPosition] = useState(0);

useEffect(() => {
  const handleScroll = () => {
	setScrollPosition(window.pageYOffset);
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
	window.removeEventListener('scroll', handleScroll);
  };
}, []);

  return (
	<ChakraProvider theme={myTheme}>
	
	<>
	<TopRight />
	  <div
		ref={sliderRef}
		className="keen-slider-scrollable"
		style={{ height: '100vh' }}
	  >
		<div className="keen-slider__slide number-slide1">
		<Flex
		  pos="fixed"
		  bottom="10vh"
		  left="0"
		  textTransform="uppercase"
		  transform="rotate(-90deg)"
		>
		  <Button
			transform="scaleY(2.2) scale(.666)"
			flexDirection="row"
			backgroundColor="pink"
			borderRadius="36"
			color="darkback"
			fontSize={['2xs','xs','md','x-large', '2xl']}
			target="_blank"
			rel="noopener noreferrer"
			variant="button"
			rightIcon={<Zorb />}
			_hover={ { bg: 'chartreuse', color: 'pink' } }
		  >
			<Link
			  href="https://create.zora.co/collections/0x6056d7d72830eec9e72e9969f25f5baa754c1434"
			  variant="none"
			  isExternal
			>
			<p>Poster 001</p>
			</Link>
		  </Button>
		</Flex>
		</div>
		<div className="keen-slider__slide number-slide2">
		<Flex
		  pos="fixed"
		  bottom="20vh"
		  left="-1vh"
		  textTransform="uppercase"
		  transform="rotate(-90deg)"
		>
		  <Button
			transform="scaleY(2.2) scale(.666)"
			flexDirection="row"
			backgroundColor="green"
			borderRadius="36"
			color="darkback"
			fontSize={['2xs','xs','md','x-large', '2xl']}
			target="_blank"
			rel="noopener noreferrer"
			variant="button"
			rightIcon={<Zorb />}
			_hover={ { bg: 'pink', color: 'blue' } }
		  >
			<Link
			  href="https://create.zora.co/collections/0xf09b5a90903afc0f6e19437d0e18f9710e7b1d3e"
			  variant="none"
			  isExternal
			>
			<p>Poster 002</p>
			</Link>
		  </Button>
		</Flex>
		</div>
		<div className="keen-slider__slide number-slide3">
		<Flex
		  pos="fixed"
		  bottom="20vh"
		  left="-1vh"
		  textTransform="uppercase"
		  transform="rotate(-90deg)"
		>
		  <Button
			transform="scaleY(2.2) scale(.666)"
			flexDirection="row"
			backgroundColor="lightgray"
			borderRadius="36"
			color="darkback"
			fontSize={['2xs','xs','md','x-large', '2xl']}
			target="_blank"
			rel="noopener noreferrer"
			variant="button"
			rightIcon={<Zorb />}
			_hover={ { bg: 'yellow', color: 'green' } }
		  >
			<Link
			  href="https://create.zora.co/collections/0x0797215f34bcf6e3770e48a76d1978a0cf67b6e6"
			  variant="none"
			  isExternal
			>
			<p>Poster 003</p>
			</Link>
		  </Button>
		</Flex>
		  
		</div>
		<div className="keen-slider__slide number-slide4">
		<Flex
		  pos="fixed"
		  bottom="20vh"
		  left="-1vh"
		  textTransform="uppercase"
		  transform="rotate(-90deg)"
		>
		  <Button
			transform="scaleY(2.2) scale(.666)"
			flexDirection="row"
			backgroundColor="blue"
			borderRadius="36"
			color="white"
			fontSize={['2xs','xs','md','x-large', '2xl']}
			target="_blank"
			rel="noopener noreferrer"
			variant="button"
			rightIcon={<Zorb />}
			_hover={ { bg: 'white', color: 'blue' } }
		  >
			<Link
			  href="https://create.zora.co/collections/0x3462150aff5724e2d74d3118b7ffd6e963536ddd"
			  variant="none"
			  isExternal
			>
			<p>Poster 004</p>
			</Link>
		  </Button>
		</Flex>
		  
		</div>
		<div className="keen-slider__slide number-slide5">
		<Flex
		  pos="fixed"
		  bottom="20vh"
		  left="-1vh"
		  textTransform="uppercase"
		  transform="rotate(-90deg)"
		>
		  <Button
			transform="scaleY(2.2) scale(.666)"
			flexDirection="row"
			backgroundColor="chartreuse"
			borderRadius="36"
			color="orange"
			fontSize={['2xs','xs','md','x-large', '2xl']}
			target="_blank"
			rel="noopener noreferrer"
			variant="button"
			rightIcon={<Zorb />}
			_hover={ { bg: 'pink', color: 'white' } }
		  >
			<Link
			  href="https://create.zora.co/collections/0x892e712e7917c06bf3b73260c7a535ec006512d6"
			  variant="none"
			  isExternal
			>
			<p>Poster 005</p>
			</Link>
		  </Button>
		</Flex>
		</div>
		<div className="keen-slider__slide number-slide6">
		<Flex
		  pos="fixed"
		  bottom="20vh"
		  left="-1vh"
		  textTransform="uppercase"
		  transform="rotate(-90deg)"
		>
		  <Button
			transform="scaleY(2.2) scale(.666)"
			flexDirection="row"
			backgroundColor="orange"
			borderRadius="36"
			color="green"
			fontSize={['2xs','xs','md','x-large', '2xl']}
			target="_blank"
			rel="noopener noreferrer"
			variant="button"
			rightIcon={<Zorb />}
			_hover={ { bg: 'yellow', color: 'pink' } }
		  >
			<Link
			  href="https://create.zora.co/collections/0x058905fde701d598a9922751478e9c3c7e19bf16"
			  variant="none"
			  isExternal
			>
			<p>Poster 006</p>
			</Link>
		  </Button>
		</Flex>
		</div>
		<div className="keen-slider__slide number-slide7">
		<Flex
		  pos="fixed"
		  bottom="20vh"
		  left="-1vh"
		  textTransform="uppercase"
		  transform="rotate(-90deg)"
		>
		  <Button
			transform="scaleY(2.2) scale(.666)"
			flexDirection="row"
			backgroundColor="green"
			borderRadius="36"
			color="pink"
			fontSize={['2xs','xs','md','x-large', '2xl']}
			target="_blank"
			rel="noopener noreferrer"
			variant="button"
			rightIcon={<Zorb />}
			_hover={ { bg: 'pink', color: 'green' } }
		  >
			<Link
			  href="https://create.zora.co/collections/0x8b50cb0efe5a278367499c0932e6627048473647"
			  variant="none"
			  isExternal
			>
			<p>Poster 007</p>
			</Link>
		  </Button>
		</Flex>
		</div>
		<div className="keen-slider__slide number-slide8">
		<Flex
		  pos="fixed"
		  bottom="20vh"
		  left="-1vh"
		  textTransform="uppercase"
		  transform="rotate(-90deg)"
		>
		  <Button
			transform="scaleY(2.2) scale(.666)"
			flexDirection="row"
			backgroundColor="orange"
			borderRadius="36"
			color="chartreuse"
			fontSize={['2xs','xs','md','x-large', '2xl']}
			target="_blank"
			rel="noopener noreferrer"
			variant="button"
			rightIcon={<Zorb />}
			_hover={ { bg: 'chartreuse', color: 'pink' } }
		  >
			<Link
			  href="https://zora.co/collect/eth:0x67524c0d89d02bdf6ddff96125d785a666f810dc"
			  variant="none"
			  isExternal
			>
			<p>Poster 008</p>
			</Link>
		  </Button>
		</Flex>
		</div>
	  </div>
	  <NoiseOverlay />
	  
	</>
	</ChakraProvider>
  );
}
