"use client"

import { useSearchParams } from 'next/navigation'
import { useRef, useEffect } from 'react';
import SunSvg from '@/components/SunSvg';

export default function Page() {
    const searchParams = useSearchParams()
    console.log(searchParams);

    const svgRef = useRef<SVGSVGElement | null>(null);

//    useEffect(() => {
//        const sun = svgRef.current?.querySelector('#sun');
//        if (sun) {
//          sun.setAttribute('cx', '400'); // New x-coordinate
//          sun.setAttribute('cy', '200'); // New y-coordinate
//        }
//    }, []);

    return (
        <main>
            <SunSvg
                ref={svgRef}
                initialCx={400}
                initialCy={200}
            />
        </main>
    );
};

