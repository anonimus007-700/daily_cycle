import { NextRequest, NextResponse } from 'next/server';
import React from 'react';
// import { useSearchParams } from 'next/navigation'

import getData from '@/utils/renderSvgToString';
import SunSvg from '@/components/SunSvg';

export async function GET(request: NextRequest) {
  // const searchParams = useSearchParams()
  // console.log(searchParams);

  let initialCx = 400
  let initialCy = 200

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

