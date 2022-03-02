---
title: Breakpoints
description: Breakpoints
date: 2020-09-24 07:30
tags: [html, css, breakpoints]
---

````js
const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  mobileXL: "850px",
  mobileX: "813px",
  tablet: "769px",
  laptop: "1025px",
  laptopL: "1440px",
  desktopS: "1336px",
  desktopHd: "1900px",
  desktop: "2500px",
  width960px: "960px",
  width450px: "450px"
};
export default {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  mobileX: `(min-width: ${size.mobileX})`,
  maxMobile: `(max-width: ${size.mobileM})`,
  mobileXL: `(min-width: ${size.mobileXL})`,
  maxMobileXL: `screen and (min-width : ${size.tablet}) and (max-width : ${size.mobileXL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  maxLaptop: `(max-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopS: `(min-width: ${size.desktopS})`,
  desktopHd: `(min-width: ${size.desktopHd})`,
  sizeTablet: `${size.tablet}`,
  minWidth960px: `(min-width: ${size.width960px})`,
  maxWidth450px: `(max-width: ${size.width450px})`
};```
````
