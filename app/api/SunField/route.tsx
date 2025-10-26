import { NextRequest, NextResponse } from 'next/server';
import React from 'react';
import fs from 'fs';

import axios from 'axios';
import Papa from 'papaparse';

import getData from '@/utils/renderSvgToString';
import dayOfYear from '@/utils/dayOfYear';
import { getCordinates }from '@/utils/findOutCordinates.tsx';
import SunSvg from '@/components/SunSvg';
import { getLocalTime, getCapitalCoordinates, getSunraiseSunset } from '@/services/dataService';


const csvCountryPath = fs.readFileSync('src/data/country-capital-lat-long-population.csv', 'utf8');

export async function GET(request: NextRequest) {

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const country = searchParams.get("country");
  console.log(country);

  const coords = await getCapitalCoordinates(country, csvCountryPath);
  // { lat: '50.4454', lng: '30.5186' }

  const date = await getLocalTime(coords.lat, coords.lng);
  // date.formatted >> 2025-08-29 18:35:52

  const suns = await getSunraiseSunset(coords.lat, coords.lng, date);
  /*
    {
  results: {
    date: '2025-08-30',
    sunrise: '06:10:30',
    sunset: '19:49:43',
    first_light: '04:07:49',
    last_light: '21:52:24',
    dawn: '05:36:14',
    dusk: '20:23:59',
    solar_noon: '13:00:06',
    golden_hour: '19:05:57',
    day_length: '13:39:12',
    timezone: 'Europe/Kiev',
    utc_offset: 180
  },
  status: 'OK'
  }
  */

  const cords = getCordinates(date.formatted, suns.results.day_length, suns.results.sunrise);

  let initialCx = cords.x;
  let initialCy = cords.y;

  const svgString = await getData(
    <SunSvg
      initialCx={initialCx}
      initialCy={initialCy}
    />
  );

  return new NextResponse(svgString, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });

}

