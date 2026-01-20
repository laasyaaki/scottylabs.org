/// <reference types="react" />
import React from 'react';
import { Users } from 'lucide-react';

// Leadership data for two years
const YEARS = [
  {
    label: "2025-26",
    directors: [
      { name: "Theo Urban", role: "Director of ScottyLabs", image: "TheoUrban.jpg" },
      { name: "Samritha Duggarala", role: "Director of Events", image: "SamrithaDuggarala.jpg" },
      { name: "Arjun Patel", role: "Director of Outreach", image: "ArjunPatel.jpg" },
      { name: "Yuxiang Huang", role: "Director of Tech", image: "YuxiangHuang.jpg" },
      { name: "Thomas Kanz", role: "Director of Labrador", image: "ThomasKanz.jpg" },
      { name: "Wendy Yu", role: "Director of Design", image: "WendyYu.jpg" },
      { name: "Allen Gu", role: "Director of Finance", image: "AllenGu.png" },
    ],
    teams: [
      [],
      [
        { name: "Evan Foster", role: "Head Of Logistics", image: "EvanFoster.jpg" },
        { name: "Dylan Yang", role: "Head Of Logistics", image: "DylanYang.jpg" },
      ],
      [
        { name: "Vendanth Ramanathan", role: "Head of Internal Outreach", image: "VendanthRamanathan.jpg" },
        { name: "Yuchen Zhou", role: "Head of Internal Outreach", image: "YuchenZhou.jpg" },
      ],
      [
        { name: "Jack Hurewitz", role: "Head of Data & Analytics", image: "JackHurewitz.avif" },
        { name: "Anish Pallati", role: "Head of DevOps, Terrier Tech Lead", image: "AnishPallati.jpg" },
        { name: "Xavier Lien", role: "CMU Courses Tech Lead", image: "XavierLien.jpg" },
        { name: "Laasya Aki", role: "CMU Eats Tech Co-Lead", image: "LaasyaAki.jpg" },
        { name: "Eric Xu", role: "CMU Eats Tech Co-Lead, FLEx (Frontend Landing Experience) Tech Lead", image: "EricXu.png" },
        { name: "Ellyse Lai", role: "CMU Floorplans Tech Lead", image: "EllyseLai.jpg" },
        { name: "Luke Hann", role: "CMU Maps Tech Lead", image: "LukeHann.jpg" },
        { name: "Anna Gu", role: "Lost & Found Tech Lead", image: "AnnaGu.png" },
        { name: "Autumn Qiu" , role: "TartanHacks Dashboard Tech Lead", image: "AutumnQiu.jpg" },
      ],
      [
        { name: "Indu Arimilli", role: "Head of Recruitment & Retention", image: "InduArimilli.jpg" },
        { name: "Dhiren Narne", role: "Head of Recruitment & Retention", image: "DhirenNarne.jpg" },
        { name: "Hana Benko", role: "Head of Teach Mentorship", image: "HanaBenko.jpg" },
        { name: "Anika Halappanavar", role: "Head of Product Management", image: "AnikaHalappanavar.jpg" },
        { name: "Lena Poshni", role: "FE Team Lead", image: "LenaPoshni.jpg" },
        { name: "Jonathan Oh", role: "BE Team Lead", image: "JonathanOh.png" },
      ],
      [
        { name: "Amy Choi", role: "Head of UI/UX", image: "AmyChoi.jpg" },
        { name: "Kyla Anderson", role: "Head of UI/UX", image: "KylaAnderson.jpg" },
        { name: "Arunimas Das", role: "Head of Branding", image: "ArunimasDas.jpg" },
        { name: "Jean Chen", role: "Head of Branding", image: "JeanChen.jpg" },
      ],
      [
        { name: "Justin Wu", role: "Head of Sponsorships", image: "JustinWu.jpg" },
      ],
    ],
  },
  {
    label: "2024-25",
    directors: [
      { name: "Michael Zhou", role: "Director of ScottyLabs" },
      { name: "Cooper Bruno", role: "Director of Events" },
      { name: "Tevin Wang", role: "Director of Outreach" },
      { name: "Xavier Lien", role: "Director of Tech" },
      { name: "Theo Urban", role: "Director of Labrador" },
      { name: "Chloe Sun", role: "Director of Design" },
      { name: "Matthew Mingus", role: "Director of Finance" },
    ],
    teams: [
      [],
      [
        { name: "Ted Gershon", role: "Head Of Logistics", image: "TedGershon.jpg" },
        { name: "Samhitha Duggirala", role: "Head Of Logistics", image: "SamhithaDuggirala.jpg" },
      ],
      [
        { name: "Maelle Allanic", role: "Head of Recruitment & Retention", image: "MaelleAllanic.jpg" },
        { name: "Cassandra Zhou", role: "Head of Content", image: "CassandraZhou.jpg" },
        { name: "Angela Lou", role: "Head of PR", image: "AngelaLou.jpg" },
      ],
      [
        { name: "Josef Macera", role: "Head of Education & Onboarding", image: "JosefMacera.jpg" },
        { name: "Yuxiang Huang", role: "CMU Maps Tech Lead", image: "YuxiangHuang.jpg" },
        { name: "Jack Hurewitz", role: "CMU Eats Tech Lead", image: "JackHurewitz.jpg" },
        { name: "Xavier Lien", role: "CMU Courses Tech Lead", image: "XavierLien.jpg" },
        { name: "Anna Gu", role: "Lost & Found Tech Lead", image: "AnnaGu.png" },
        { name: "Gabriel Hall", role: "TartanHacks Tech Lead", image: "GabrielHall.png" },
      ],
      [
        { name: "Autumn Qiu", role: "Head of Education & Onboarding", image: "AutumnQiu.jpg" },
        { name: "Thomas Kanz", role: "CMU GPT Lab Lead", image: "ThomasKanz.jpg" },
      ],
      [
        { name: "Fara Yan", role: "Head of UI/UX", image: "FaraYan.jpg" },
        { name: "Chloe Yan", role: "Head of UI/UX", image: "ChloeYan.jpg" },
        { name: "Stacy Chen", role: "Head of Branding", image: "StacyChen.jpg" },
        { name: "Joanna Ni", role: "Head of Branding", image: "JoannaNi.jpg" },
      ],
      [
        { name: "Allen Gu", role: "Head of Purchasing & Planning", image: "AllenGu.png" },
        { name: "Edison Dao", role: "Head of Sponsorships", image: "EdisonDao.jpg" },
      ],
    ],
  },
];

type Person = { name: string; role: string; image?: string };
type YearType = { label: string; directors: Person[]; teams: Person[][] };

interface ProfileProps {
  name: string;
  role: string;
  isDirector?: boolean;
}

const ProfileCard: React.FC<ProfileProps> = ({ name, role, isDirector = false }) => (
  <div className={`flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm ${isDirector ? 'w-28' : 'w-20'}`}>
    <div className={`${isDirector ? 'w-20 h-20' : 'w-14 h-14'} bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center`}>
      <Users className={`${isDirector ? 'w-10 h-10' : 'w-7 h-7'} text-white`} />
    </div>
    <div className="text-center">
      <div className={`font-semibold ${isDirector ? 'text-sm' : 'text-xs'}`}>{name}</div>
      <div className={`text-gray-600 ${isDirector ? 'text-xs' : 'text-[10px]'}`}>{role}</div>
    </div>
  </div>
);

interface YearSectionProps {
  year: YearType;
}

const YearSection: React.FC<YearSectionProps> = ({ year }) => {
  const colors = [
    'bg-blue-200/40',
    'bg-purple-200/40',
    'bg-green-200/40',
    'bg-orange-200/40',
    'bg-pink-200/40',
    'bg-indigo-200/40',
    'bg-teal-200/40',
  ];

  return (
    <div className="mb-12">
      <div className="text-2xl font-bold mb-6 text-gray-800">{year.label}</div>
      <div className="bg-gray-100 rounded-2xl p-8">
        <div className="grid grid-cols-7 gap-4 mb-6">
          {year.directors.map((director) => (
            <div key={director.name} className="flex justify-center">
              <ProfileCard name={director.name} role={director.role} isDirector />
            </div>
          ))}
        </div>

        {/* Team members in columns with connecting lines */}
        <div className="relative grid grid-cols-7 gap-4">
          {/* Vertical colored bars */}
          {colors.map((color, idx) => (
            <div
              key={color}
              className={`absolute top-0 bottom-0 ${color} rounded`}
              style={{
                left: `${(idx * 100) / 7}%`,
                width: `${100 / 7}%`,
                zIndex: 0,
              }}
            />
          ))}

          {year.teams.map((team, colIdx) => (
            <div key={colIdx} className="relative z-10 flex flex-col gap-3 items-center pt-4">
              {team.map((member) => (
                <ProfileCard key={member.name} name={member.name} role={member.role} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function LeadershipChart() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-black rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-sm" />
            </div>
            <span className="text-xl font-semibold">ScottyLabs</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-12">Leadership</h1>

        {YEARS.map((year) => (
          <YearSection key={year.label} year={year as YearType} />
        ))}
      </div>
    </div>
  );
}