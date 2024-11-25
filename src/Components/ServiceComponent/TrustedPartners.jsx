import React from 'react';
import zeinaLogo from '../../Images/FirstCompany.jpg';
import circleLogo from '../../Images/SecondCompany.jpg';
import logicLogo from '../../Images/ThirdImage.jpg';
import heartLogo from '../../Images/FourthImage.jpg';
import chartzLogo from '../../Images/FifthImage.jpg';

const Trusted = () => {
    const companies = [
        { name: 'ZEINA', logo: zeinaLogo },
        { name: 'CIRCLE', logo: circleLogo },
        { name: 'LOGIC+', logo: logicLogo },
        { name: 'HEART', logo: heartLogo },
        { name: 'CHARTZ', logo: chartzLogo },
    ];

    return (
        <div className="py-16 bg-gray-100 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-10">
                Trusted By 1000+ Companies
            </h2>
            <div className="flex flex-wrap justify-center gap-10">
                {companies.map((company, index) => (
                    <div
                        key={index}
                        className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center p-2 transition-transform transform hover:scale-105 grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
                    >
                        <img
                            src={company.logo}
                            alt={company.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trusted;
