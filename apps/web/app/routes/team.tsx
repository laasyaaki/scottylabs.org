import React from 'react';

// Import images directly from assets directory
// This way Vite/Next.js will handle the paths correctly
import TheoUrbanImg from '../assets/team-page/TheoUrban.jpg';
import SamhithaDuggiralaImg from '../assets/team-page/SamhithaDuggirala.jpg';
import ArjunPatelImg from '../assets/team-page/ArjunPatel.jpg';
import YuxiangHuangImg from '../assets/team-page/YuxiangHuang.jpg';
import ThomasKanzImg from '../assets/team-page/ThomasKanz.jpg';
import WendyYuImg from '../assets/team-page/WendyYu.jpg';
import AllenGuImg from '../assets/team-page/AllenGu.png';
import EvanFosterImg from '../assets/team-page/EvanFoster.jpg';
import DylanYangImg from '../assets/team-page/DylanYang.jpg';
import VedanthRamanathanImg from '../assets/team-page/VedanthRamanathan.jpg';
import YuchenZhouImg from '../assets/team-page/YuchenZhou.jpg';
import JackHurewitzImg from '../assets/team-page/JackHurewitz.avif';
import AnishPallatiImg from '../assets/team-page/AnishPallati.jpg';
import XavierLienImg from '../assets/team-page/XavierLien.jpg';
import LaasyaAkiImg from '../assets/team-page/LaasyaAki.jpg';
import EricXuImg from '../assets/team-page/EricXu.png';
import EllyseLaiImg from '../assets/team-page/EllyseLai.jpg';
import LukeHannImg from '../assets/team-page/LukeHann.jpg';
import AnnaGuImg from '../assets/team-page/AnnaGu.jpg';
import AutumnQiuImg from '../assets/team-page/AutumnQiu.jpg';
import InduArimilliImg from '../assets/team-page/InduArimilli.jpg';
import DhirenNarneImg from '../assets/team-page/DhirenNarne.jpg';
import HanaBenkoImg from '../assets/team-page/HanaBenko.jpg';
import AnikaHalappanavarImg from '../assets/team-page/AnikaHalappanavar.jpg';
import LenaPoshniImg from '../assets/team-page/LenaPoshni.jpg';
import JonathanOhImg from '../assets/team-page/JonathanOh.png';
import AmyChoiImg from '../assets/team-page/AmyChoi.jpg';
import KylaAndersonImg from '../assets/team-page/KylaAnderson.jpg';
import ArunimaDasImg from '../assets/team-page/ArunimaDas.jpg';
import JeanChenImg from '../assets/team-page/JeanChen.jpg';
import JustinWuImg from '../assets/team-page/JustinWu.jpg';
import MichaelZhouImg from '../assets/team-page/MichaelZhou.jpg';
import CooperBrunoImg from '../assets/team-page/CooperBruno.jpg';
import TevinWangImg from '../assets/team-page/TevinWang.jpg';
import ChloeSunImg from '../assets/team-page/ChloeSun.jpg';
import MatthewMingusImg from '../assets/team-page/MatthewMingus.jpg';
import TedGershonImg from '../assets/team-page/TedGershon.jpg';
import MaelleAllanicImg from '../assets/team-page/MaelleAllanic.jpg';
import CassandraZhouImg from '../assets/team-page/CassandraZhou.jpg';
import AngelaLouImg from '../assets/team-page/AngelaLou.jpg';
import JosefMaceraImg from '../assets/team-page/JosefMacera.jpg';
import GabrielHallImg from '../assets/team-page/GabrielHall.png';
import FaraYanImg from '../assets/team-page/FaraYan.jpg';
import ChloeYanImg from '../assets/team-page/ChloeYan.jpg';
import StacyChenImg from '../assets/team-page/StacyChen.jpg';
import JoannaNiImg from '../assets/team-page/JoannaNi.jpg';
import EdisonDaoImg from '../assets/team-page/EdisonDao.jpg';
import ChloeDengImg from '../assets/team-page/ChloeDeng.jpg';
import PreethiKrishnamoorthyImg from '../assets/team-page/PreethiKrishnamoorthy.jpg';
import AarnavPatelImg from '../assets/team-page/AarnavPatel.jpg';
import MarianQianImg from '../assets/team-page/MarianQian.jpg';
import NithyaKempImg from '../assets/team-page/NithyaKemp.jpg';
import JaisalPatelImg from '../assets/team-page/JaisalPatel.jpg';
import BradleyTeoImg from '../assets/team-page/BradleyTeo.jpg';
import HongLinImg from '../assets/team-page/HongLin.jpg';
import AlexanderObolenskiyImg from '../assets/team-page/AlexanderObolenskiy.jpg';
import MichelleLiImg from '../assets/team-page/MichelleLi.jpg';
import RajeevGodseImg from '../assets/team-page/RajeevGodse.jpg';
import MihirDhamankarImg from '../assets/team-page/MihirDhamankar.jpg';
import AnudaWeerasingheImg from '../assets/team-page/AnudaWeerasinghe.jpg';
import PiReyLowImg from '../assets/team-page/PiReyLow.jpg';
import MeganGuImg from '../assets/team-page/MeganGu.jpg';
import KatherineZhaoImg from '../assets/team-page/KatherineZhao.jpg';
import JoonKwonImg from '../assets/team-page/JoonKwon.jpg';
import ElinZhouImg from '../assets/team-page/ElinZhou.jpg';
import SaumeyaSuseenthiranImg from '../assets/team-page/SaumeyaSuseenthiran.jpg';
import EmilyGuoImg from '../assets/team-page/EmilyGuo.jpg';
import TikaNaikImg from '../assets/team-page/TikaNaik.jpg';
import ShreeyaKhuranaImg from '../assets/team-page/ShreeyaKhurana.jpg';
import DavidHwangImg from '../assets/team-page/DavidHwang.jpg';
import ShannonLinImg from '../assets/team-page/ShannonLin.jpg';
import SanjanaMeduriImg from '../assets/team-page/SanjanaMeduri.jpg';


// Type definitions
type Person = {
  name: string;
  role: string;
  image?: string | any;
  url?: string; // LinkedIn OR personal website (optional)
};

type YearType = {
  label: string;
  directors: Array<Person | null>; // allow empty director slots
  teams: Person[][];
};

/** Wraps children in an anchor only if href exists (so the whole card becomes clickable). */
const ClickableWrapper: React.FC<{ href?: string; children: React.ReactNode; ariaLabel?: string }> = ({
  href,
  children,
  ariaLabel,
}) => {
  if (!href) return <>{children}</>;

  return (
    <a
      href={href.trim()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
      }}
    >
      {children}
    </a>
  );
};

// Reusable director card matching the screenshot design
const DirectorCard: React.FC<{ person: Person; size?: number }> = ({ person, size = 160 }) => {
  const initials = person.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  const card = (
    <div
      style={{
        display: 'flex',
        padding: '16px',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        borderRadius: '20px',
        background: '#FFF',
        boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.15)',
        width: size,
        minHeight: '200px',
        cursor: person.url ? 'pointer' : 'default',
        transition: 'transform 120ms ease, box-shadow 120ms ease',
      }}
      onMouseEnter={(e) => {
        if (!person.url) return;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 22px 0 rgba(0, 0, 0, 0.18)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 16px 0 rgba(0, 0, 0, 0.15)';
      }}
    >
      {/* Photo with rounded corners - fills remaining space */}
      <div
        style={{
          width: '100%',
          flex: '1',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F3F4F6',
          minHeight: '0',
        }}
      >
        {person.image ? (
          <img
            src={typeof person.image === 'string' ? person.image : person.image.src || person.image}
            alt={person.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#F3F4F6',
              color: '#111827',
              fontWeight: 700,
              fontSize: '24px',
            }}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Name and role below photo */}
      <div style={{ textAlign: 'center', width: '100%' }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: '16px',
            color: '#07123b',
            marginBottom: '4px',
            lineHeight: '1.2',
          }}
        >
          {person.name}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#6b7280',
            lineHeight: '1.3',
          }}
        >
          {person.role}
        </div>
      </div>
    </div>
  );

  return (
    <ClickableWrapper href={person.url} ariaLabel={`Open ${person.name}'s link`}>
      {card}
    </ClickableWrapper>
  );
};

// Team member card - similar to DirectorCard but smaller
const TeamMemberCard: React.FC<{ person: Person }> = ({ person }) => {
  const initials = person.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  const card = (
    <div
      style={{
        display: 'flex',
        padding: '0px 10px 10px 10px',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '12px',
        background: '#FFF',
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
        width: '70px',
        minHeight: '110px',
        overflow: 'hidden',
        cursor: person.url ? 'pointer' : 'default',
        transition: 'transform 120ms ease, box-shadow 120ms ease',
      }}
      onMouseEnter={(e) => {
        if (!person.url) return;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 14px 0 rgba(0, 0, 0, 0.14)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Photo with rounded corners only on top */}
      <div
        style={{
          width: 'calc(100% + 20px)',
          marginLeft: '-10px',
          marginRight: '-10px',
          flex: '1',
          borderRadius: '12px 12px 0 0',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F3F4F6',
          minHeight: '0',
        }}
      >
        {person.image ? (
          <img
            src={typeof person.image === 'string' ? person.image : person.image.src || person.image}
            alt={person.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#F3F4F6',
              color: '#111827',
              fontWeight: 700,
              fontSize: '14px',
            }}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Name and role below photo */}
      <div style={{ textAlign: 'center', width: '100%' }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: '9px',
            color: '#07123b',
            marginBottom: '2px',
            lineHeight: '1.2',
          }}
        >
          {person.name}
        </div>
        <div
          style={{
            fontSize: '7px',
            color: '#6b7280',
            lineHeight: '1.2',
          }}
        >
          {person.role}
        </div>
      </div>
    </div>
  );

  return (
    <ClickableWrapper href={person.url} ariaLabel={`Open ${person.name}'s link`}>
      {card}
    </ClickableWrapper>
  );
};

// Leadership data
const YEARS: YearType[] = [
  {
    label: '2025-26',
    directors: [
      { name: 'Theo Urban', role: 'Director of ScottyLabs', image: TheoUrbanImg, url: 'https://www.linkedin.com/in/tsurban/' },
      { name: 'Samritha Duggarala', role: 'Director of Events', image: SamhithaDuggiralaImg, url: 'https://www.linkedin.com/in/samhitha-duggirala/' },
      { name: 'Arjun Patel', role: 'Director of Outreach', image: ArjunPatelImg, url: 'https://www.linkedin.com/in/arjun-niraj-patel/' },
      { name: 'Yuxiang Huang', role: 'Director of Tech', image: YuxiangHuangImg, url: 'https://www.linkedin.com/in/yuxiang-huang-7b646028b/' },
      { name: 'Thomas Kanz', role: 'Director of Labrador', image: ThomasKanzImg, url: 'https://www.linkedin.com/in/thomas-kanz/' },
      { name: 'Wendy Yu', role: 'Director of Design', image: WendyYuImg, url: 'https://www.linkedin.com/in/wendyyu35/' },
      { name: 'Allen Gu', role: 'Director of Finance', image: AllenGuImg, url: 'https://www.linkedin.com/in/allen-gu/' },
    ],
    teams: [
      [],
      [
        { name: 'Evan Foster', role: 'Head Of Logistics', image: EvanFosterImg, url: 'https://www.linkedin.com/in/ebfoster/' },
        { name: 'Dylan Yang', role: 'Head Of Logistics', image: DylanYangImg, url: 'https://www.linkedin.com/in/dylany666/' },
      ],
      [
        { name: 'Vedanth Ramanathan', role: 'Head of Internal Outreach', image: VedanthRamanathanImg, url: 'https://www.linkedin.com/in/vedanthramanathan/' },
        { name: 'Yuchen Zhou', role: 'Head of Internal Outreach', image: YuchenZhouImg, url: 'https://www.linkedin.com/in/yuchen-zhou-58289a247/' },
      ],
      [
        { name: 'Jack Hurewitz', role: 'Head of Data & Analytics', image: JackHurewitzImg, url: 'https://github.com/JackHurew' },
        { name: 'Anish Pallati', role: 'Head of DevOps, Terrier Tech Lead', image: AnishPallatiImg, url: 'https://www.linkedin.com/in/anish-pallati/' },
        { name: 'Xavier Lien', role: 'CMU Courses Tech Lead', image: XavierLienImg, url: 'https://www.linkedin.com/in/xavilien/' },
        { name: 'Laasya Aki', role: 'CMU Eats Tech Co-Lead', image: LaasyaAkiImg, url: 'https://www.linkedin.com/in/laasyaaki/' },
        { name: 'Eric Xu', role: 'CMU Eats Tech Co-Lead, FLEx (Frontend Landing Experience) Tech Lead', image: EricXuImg, url: 'https://www.linkedin.com/in/eric-xu-032890214/' },
        { name: 'Ellyse Lai', role: 'CMU Floorplans Tech Lead', image: EllyseLaiImg, url: 'https://www.linkedin.com/in/ellyse-lai/' },
        { name: 'Luke Hann', role: 'CMU Maps Tech Lead', image: LukeHannImg, url: 'https://www.linkedin.com/in/luke-hann-2ba585322/' },
        { name: 'Anna Gu', role: 'Lost & Found Tech Lead', image: AnnaGuImg, url: 'https://www.linkedin.com/in/anna-gu-b7591a299/' },
        { name: 'Autumn Qiu', role: 'TartanHacks Dashboard Tech Lead', image: AutumnQiuImg, url: 'https://www.linkedin.com/in/autumn-qiu/' },
      ],
      [
        { name: 'Indu Arimilli', role: 'Head of Recruitment & Retention', image: InduArimilliImg, url: 'https://www.linkedin.com/in/induarimilli/' },
        { name: 'Dhiren Narne', role: 'Head of Recruitment & Retention', image: DhirenNarneImg, url: 'https://www.linkedin.com/in/dhirennarne/' },
        { name: 'Hana Benko', role: 'Head of Teach Mentorship', image: HanaBenkoImg, url: 'https://www.linkedin.com/in/hana-benko/' },
        { name: 'Anika Halappanavar', role: 'Head of Product Management', image: AnikaHalappanavarImg, url: 'https://www.linkedin.com/in/anika-halappanavar-b4357b20a/' },
        { name: 'Lena Poshni', role: 'FE Team Lead', image: LenaPoshniImg, url: 'https://www.linkedin.com/in/lenaposhni18/' },
        { name: 'Jonathan Oh', role: 'BE Team Lead', image: JonathanOhImg, url: 'https://www.linkedin.com/in/joonho-oh/' },
      ],
      [
        { name: 'Amy Choi', role: 'Head of UI/UX', image: AmyChoiImg, url: 'https://www.linkedin.com/in/amy-choi-a54bb21b7/' },
        { name: 'Kyla Anderson', role: 'Head of UI/UX', image: KylaAndersonImg, url: 'https://www.linkedin.com/in/kyla-anderson-designer/' },
        { name: 'Arunima Das', role: 'Head of Branding', image: ArunimaDasImg, url: 'https://www.linkedin.com/in/arunima-das/' },
        { name: 'Jean Chen', role: 'Head of Branding', image: JeanChenImg, url: 'https://www.linkedin.com/in/jeanxcrj/' },
      ],
      [{ name: 'Justin Wu', role: 'Head of Sponsorship', image: JustinWuImg, url: 'https://www.linkedin.com/in/justin-wu-b9802621a/' }],
    ],
  },
  {
    label: '2024-25',
    directors: [
      { name: 'Michael Zhou', role: 'Director of ScottyLabs', image: MichaelZhouImg, url: 'https://www.linkedin.com/in/michaelhzhou/' },
      { name: 'Cooper Bruno', role: 'Director of Events', image: CooperBrunoImg, url: 'https://www.linkedin.com/in/cooperbruno/' },
      { name: 'Tevin Wang', role: 'Director of Outreach', image: TevinWangImg, url: 'https://www.linkedin.com/in/tevinwang/' },
      { name: 'Xavier Lien', role: 'Director of Tech', image: XavierLienImg, url: 'https://www.linkedin.com/in/xavilien/' },
      { name: 'Theo Urban', role: 'Director of Labrador', image: TheoUrbanImg, url: 'https://www.linkedin.com/in/tsurban/' },
      { name: 'Chloe Sun', role: 'Director of Design', image: ChloeSunImg, url: 'https://www.linkedin.com/in/chloe-sun-b58b9b1b3/' },
      { name: 'Matthew Mingus', role: 'Director of Finance', image: MatthewMingusImg, url: 'https://www.linkedin.com/in/mmingus/' },
    ],
    teams: [
      [],
      [
        { name: 'Ted Gershon', role: 'Head Of Logistics', image: TedGershonImg, url: 'https://www.linkedin.com/in/tedgershon/' },
        { name: 'Samhitha Duggirala', role: 'Head Of Logistics', image: SamhithaDuggiralaImg, url: 'https://www.linkedin.com/in/samhithaduggirala/' },
      ],
      [
        { name: 'Maelle Allanic', role: 'Head of Recruitment & Retention', image: MaelleAllanicImg, url: 'https://www.linkedin.com/in/maelle-allanic/' },
        { name: 'Cassandra Zhou', role: 'Head of Content', image: CassandraZhouImg, url: 'https://www.linkedin.com/in/runxin-zhou/' },
        { name: 'Angela Lou', role: 'Head of PR', image: AngelaLouImg, url: 'https://www.linkedin.com/in/angela-lou-96b430250/' },
      ],
      [
        { name: 'Josef Macera', role: 'Head of Education & Onboarding', image: JosefMaceraImg, url: 'https://www.linkedin.com/in/josefmacera/' },
        { name: 'Yuxiang Huang', role: 'CMU Maps Tech Lead', image: YuxiangHuangImg, url: 'https://www.linkedin.com/in/yuxiang-huang-7b646028b/' },
        { name: 'Jack Hurewitz', role: 'CMU Eats Tech Lead', image: JackHurewitzImg, url: 'https://github.com/JackHurew' },
        { name: 'Xavier Lien', role: 'CMU Courses Tech Lead', image: XavierLienImg, url: 'https://www.linkedin.com/in/xavilien/' },
        { name: 'Anna Gu', role: 'Lost & Found Tech Lead', image: AnnaGuImg, url: 'https://www.linkedin.com/in/anna-gu-b7591a299/' },
        { name: 'Gabriel Hall', role: 'TartanHacks Tech Lead', image: GabrielHallImg, url: 'https://www.linkedin.com/in/gabriel-hall' },
      ],
      [
        { name: 'Autumn Qiu', role: 'Head of Education & Onboarding', image: AutumnQiuImg, url: 'https://www.linkedin.com/in/autumn-qiu/' },
        { name: 'Thomas Kanz', role: 'CMU GPT Lab Lead', image: ThomasKanzImg, url: 'https://www.linkedin.com/in/thomas-kanz/' },
      ],
      [
        { name: 'Fara Yan', role: 'Head of UI/UX', image: FaraYanImg, url: 'https://www.linkedin.com/in/farayan/' },
        { name: 'Chloe Yan', role: 'Head of UI/UX', image: ChloeYanImg, url: 'https://www.linkedin.com/in/chloe-yan/' },
        { name: 'Stacy Chen', role: 'Head of Branding', image: StacyChenImg, url: 'https://www.linkedin.com/in/stacy-chen-9862551b0/' },
        { name: 'Joanna Ni', role: 'Head of Branding', image: JoannaNiImg, url: 'https://www.linkedin.com/in/joanna-ni-887870262/' },
      ],
      [
        { name: 'Allen Gu', role: 'Head of Purchasing & Planning', image: AllenGuImg, url: 'https://www.linkedin.com/in/allen-gu/' },
        { name: 'Edison Dao', role: 'Head of Sponsorships', image: EdisonDaoImg, url: 'https://www.linkedin.com/in/edisondao/' },
      ],
    ],
  },
  {
    label: '2023-24',
    directors: [
      { name: 'Chloe Deng', role: 'Director of ScottyLabs', image: ChloeDengImg, url: 'https://www.linkedin.com/in/chloehdeng/' },
      { name: 'Preethi Krishnamoorthy', role: 'Director of Events', image: PreethiKrishnamoorthyImg, url: 'https://www.linkedin.com/in/preethikrish/' },
      { name: 'Tevin Wang', role: 'Director of Outreach', image: TevinWangImg, url: 'https://www.linkedin.com/in/tevinwang/' },
      { name: 'Gabriel Hall', role: 'Director of Tech', image: GabrielHallImg, url: 'https://www.linkedin.com/in/gabriel-hall' },
      { name: 'Michael Zhou', role: 'Director of Labrador', image: MichaelZhouImg, url: 'https://www.linkedin.com/in/michaelhzhou/' },
      { name: 'Aarnav Patel', role: 'Director of Design', image: AarnavPatelImg, url: 'https://www.linkedin.com/in/aarnav-patel-ba397b244/' },
      { name: 'Marian Qian', role: 'Director of Finance', image: MarianQianImg, url: 'https://www.linkedin.com/in/marian-q-721580169/' },
    ],
    teams: [
      [],
      [
        // NOTE: you had TedGershonImg here before; keeping your original image reference would be better if you have CooperBrunoImg
        { name: 'Cooper Bruno', role: 'Head Of Logistics', image: CooperBrunoImg, url: 'https://www.linkedin.com/in/cooperbruno/' },
        { name: 'Nithya Kemp', role: 'Head Of Logistics', image: NithyaKempImg, url: 'https://www.linkedin.com/in/nithya-kemp-a2941b220/' },
      ],
      [
        { name: 'Maelle Allanic', role: 'Head of Recruitment & Retention', image: MaelleAllanicImg, url: 'https://www.linkedin.com/in/maelle-allanic/' },
        { name: 'Cassandra Zhou', role: 'Head of Content', image: CassandraZhouImg, url: 'https://www.linkedin.com/in/runxin-zhou/' },
      ],
      [
        { name: 'Jaisal Patel', role: 'CMU Eats Tech Lead', image: JaisalPatelImg, url: 'https://www.linkedin.com/in/jaisal-p/' },
        { name: 'Bradley Teo', role: 'CMU Courses Tech Lead', image: BradleyTeoImg, url: 'https://www.linkedin.com/in/bradley-teo/' },
        { name: 'Hong Lin', role: 'CMU Courses Tech Lead', image: HongLinImg, url: 'https://www.linkedin.com/in/linhong2000/' },
        { name: 'Xavier Lien', role: 'CMU Courses Tech Lead', image: XavierLienImg, url: 'https://www.linkedin.com/in/xavilien/' },
        { name: 'Alexander Obolenskiy', role: 'TartanHacks Tech Lead', image: AlexanderObolenskiyImg, url: 'https://www.linkedin.com/in/alexander-obolenskiy/' },
        { name: 'Michelle Li', role: 'Lost & Found Tech Lead', image: MichelleLiImg, url: 'https://www.linkedin.com/in/michelleli77/' },
        { name: 'Rajeev Godse', role: 'Scotty.lol Tech Lead', image: RajeevGodseImg, url: 'https://www.linkedin.com/in/rajeevgodse/' },
        { name: 'Anna Gu', role: 'Lost & Found Tech Lead', image: AnnaGuImg, url: 'https://www.linkedin.com/in/anna-gu-b7591a299/' },
        { name: 'Gabriel Hall', role: 'Roomies Tech Lead', image: GabrielHallImg, url: 'https://www.linkedin.com/in/gabriel-hall' },
      ],
      [
        { name: 'Theo Urban', role: 'CMU Maps Lead', image: TheoUrbanImg, url: 'https://www.linkedin.com/in/tsurban/' },
        { name: 'Mihir Dhamankar', role: 'CMU Maps Lead', image: MihirDhamankarImg, url: 'https://www.linkedin.com/in/mihirdhamankar/' },
        { name: 'Anuda Weerasinghe', role: 'CMU Seats Lead', image: AnudaWeerasingheImg, url: 'https://www.linkedin.com/in/anudaw/' },
        { name: 'Xavier Lien', role: 'CMU Seats Lead', image: XavierLienImg, url: 'https://www.linkedin.com/in/xavilien/' },
        { name: 'Pi Rey Low', role: 'CMU Seats Lead', image: PiReyLowImg, url: 'https://www.linkedin.com/in/pireylow/' },
        { name: 'Autumn Qiu', role: 'CMU Grovery List Lead', image: AutumnQiuImg, url: 'https://www.linkedin.com/in/autumn-qiu/' },
        { name: 'Megan Gu', role: 'CMU Grovery List Lead', image: MeganGuImg, url: 'https://www.linkedin.com/in/megan-gu-62797a2a0/' },
        { name: 'Katherine Zhao', role: 'CMU Grovery List Lead', image: KatherineZhaoImg, url: 'https://www.linkedin.com/in/katherine-zhao16/' },
        { name: 'Joon Kwon', role: 'CMU Cal Lead', image: JoonKwonImg, url: 'https://www.linkedin.com/in/joonkwonn/' },
      ],
      [
        { name: 'Elin Zhou', role: 'Head of UI/UX', image: ElinZhouImg, url: 'https://www.linkedin.com/in/elin-zhou-08606820a/' },
        { name: 'Chloe Yan', role: 'Head of UI/UX', image: ChloeYanImg, url: 'https://www.linkedin.com/in/chloe-yan/' },
        { name: 'Saumeya Suseenthiran', role: 'Head of Branding', image: SaumeyaSuseenthiranImg, url: 'https://www.linkedin.com/in/saumeya-suseenthiran-012684252/' },
        { name: 'Fara Yan', role: 'Head of Branding', image: FaraYanImg, url: 'https://www.linkedin.com/in/farayan/' },
      ],
      [{ name: 'Emily Guo', role: 'Head of Sponsorship', image: EmilyGuoImg, url: 'https://www.linkedin.com/in/emily-guo17/' }],
    ],
  },
  {
    label: '2022-23',
    directors: [
      { name: 'Anuda Weerasinghe', role: 'Director of ScottyLabs', image: AnudaWeerasingheImg, url: 'https://www.linkedin.com/in/anudaw/' },
      { name: 'Tika Naik', role: 'Director of Events', image: TikaNaikImg, url: 'https://www.linkedin.com/in/tika-naik/' },
      { name: 'Shreeya Khurana', role: 'Director of Outreach', image: ShreeyaKhuranaImg, url: 'https://www.linkedin.com/in/shreeya-khurana/' },
      { name: 'David Hwang', role: 'Director of Tech', image: DavidHwangImg, url: 'https://www.linkedin.com/in/h-davidethan/' },
      null, // Labrador missing
      { name: 'Shannon Lin', role: 'Director of Design', image: ShannonLinImg, url: 'https://www.linkedin.com/in/shannonalin/' },
      { name: 'Sanjana Meduri', role: 'Director of Finance', image: SanjanaMeduriImg, url: 'https://www.linkedin.com/in/sanjana-meduri/' },
    ],
    teams: [[], [], [], [], [], [], []],
  },
];

export default function Team() {
  // Exact colors from Figma with 60% opacity
  const lineColors = [
    'rgba(177, 179, 233, 0.00)', // Column 0 - Director of ScottyLabs (transparent)
    'rgba(177, 179, 233, 0.60)', // Column 1 - Events
    'rgba(177, 202, 233, 0.60)', // Column 2 - Outreach
    'rgba(236, 151, 152, 0.60)', // Column 3 - Tech
    'rgba(232, 187, 174, 0.60)', // Column 4 - Labrador
    'rgba(205, 179, 210, 0.60)', // Column 5 - Design
    'rgba(179, 213, 224, 0.60)', // Column 6 - Finance
  ];

  return (
    <section style={{ padding: '48px 24px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', margin: '0 0 24px 0', color: '#07123b' }}>Leadership</h1>

      <div
        style={{
          borderRadius: '20px',
          border: '1px solid #B0B0B0',
          background: '#F2F3F7',
          padding: '48px',
          paddingLeft: '130px',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Vertical lines spanning the entire height */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '130px',
            right: '48px',
            bottom: '48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '12px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {lineColors.map((color: string, idx: number) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '25px',
                  height: '100%',
                  backgroundColor: color,
                  borderRadius: '9999px',
                }}
              />
            </div>
          ))}
        </div>

        {/* Content with relative positioning */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {YEARS.map((year: YearType, yearIdx: number) => (
            <div
              key={`${year.label}-${yearIdx}`} // IMPORTANT: avoid duplicate keys since labels repeat
              style={{ marginBottom: yearIdx === YEARS.length - 1 ? '0' : '80px', position: 'relative' }}
            >
              {/* Directors row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gap: '12px',
                  marginBottom: '16px',
                  position: 'relative',
                }}
              >
                {/* Year label aligned with horizontal line */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-110px',
                    top: '100px',
                    transform: 'translateY(-50%)',
                    color: '#000',
                    fontFamily: 'Satoshi, sans-serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    lineHeight: '1',
                    whiteSpace: 'nowrap',
                    zIndex: 2,
                  }}
                >
                  {year.label}
                </div>

                {/* Horizontal line through center of directors */}
                <div
                  style={{
                    position: 'absolute',
                    top: '100px',
                    left: '-20px',
                    width: 'calc(100% / 7 * 6 + (100% / 7 + 12px) / 2 + 20px)',
                    height: '1px',
                    backgroundColor: '#819AFF',
                    zIndex: 0,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: '-4px',
                      top: '-4px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#819AFF',
                    }}
                  />
                </div>

                {year.directors.map((director, i) => (
                  <div
                    key={director?.name ?? `empty-director-${year.label}-${yearIdx}-${i}`}
                    style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}
                  >
                    {director ? <DirectorCard person={director} /> : null}
                  </div>
                ))}
              </div>

              {/* Teams grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
                {year.teams.map((team: Person[], colIdx: number) => {
                  const teamRows: Person[][] = [];
                  if (team) {
                    for (let i = 0; i < team.length; i += 2) {
                      teamRows.push(team.slice(i, i + 2));
                    }
                  }

                  return (
                    <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                        {teamRows.map((row: Person[], rowIdx: number) => (
                          <div key={rowIdx} style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            {row.map((member: Person) => (
                              <TeamMemberCard key={`${member.name}-${member.role}`} person={member} />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


