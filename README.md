<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Learning the fp-ts library when coming from a non functional-programming background can be difficult.
There are some good resources out there such as [the official documentation](https://gcanti.github.io/fp-ts/), [this fp-ts cheatsheet](https://github.com/inato/fp-ts-cheatsheet) or [this youtube playlist](https://www.youtube.com/playlist?list=PLuPevXgCPUIMbCxBEnc1dNwboH6e2ImQo).
To my knowldege, there are not interactive exercises specific to the fp-ts library that allow people to learn or test their knowledge by writing small, isolated pieces of code. This is the purpose of this repositery.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Node Js needs to be installed on your device.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Mariefay/fp-ts-exercises.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Each folder in `src` contains a bunch of exercises for one fp-ts structure.

The `.exercise.ts` files contain the exercises, with instructions to implement empty functions. 
The `solution.ts` files contain possible solutions to the exercises. 

The command to run these files is as follow:
```sh
   npm run <type_of_file> -- <fp_ts_structure>  <exercise_number>
```

For instance, to run the first exercise of the option folder: 
```sh
   npm run exercise -- option  01
```

Try again until the tests pass, then move on the next exercise - simply replace `01` by `02` in the command line !

You can also run the solution with:
```sh
   npm run solution -- option  01
``` 
or simply open the corresponding file to see the solution code.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Add exercises for options
- [ ] Add explanation for each of the option's properties and functions used in the exercises
- [ ] Add exercises for pipe and flow
- [ ] Add exercises for eithers
- [ ] Add exercises for tasks
- [ ] Add exercises for taskEithers
- [ ] Add exercises for readerTaskEithers

See the [open issues](https://github.com/Mariefay/fp-ts-exercises/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Marie Fayard - [linkedin](https://www.linkedin.com/in/marie-fayard-585aa4133/)

Project Link: [https://github.com/Mariefay/fp-ts-exercises](https://github.com/Mariefay/fp-ts-exercises)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Mariefay/fp-ts-exercises.svg?style=for-the-badge
[forks-url]: https://github.com/Mariefay/fp-ts-exercises/network/members
[stars-shield]: https://img.shields.io/github/stars/Mariefay/fp-ts-exercises.svg?style=for-the-badge
[stars-url]: https://github.com/Mariefay/fp-ts-exercises/stargazers
[issues-shield]: https://img.shields.io/github/issues/Mariefay/fp-ts-exercises.svg?style=for-the-badge
[issues-url]: https://github.com/Mariefay/fp-ts-exercises/issues
[license-shield]: https://img.shields.io/github/license/Mariefay/fp-ts-exercises.svg?style=for-the-badge
[license-url]: https://github.com/Mariefay/fp-ts-exercises/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/marie-fayard-585aa4133/
[product-screenshot]: images/screenshot.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[svelte-url]: https://svelte.dev/
[laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[laravel-url]: https://laravel.com
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com
