import React, { useEffect } from 'react';
import AllPost from './homePage/AllPost';
import AnnouncementsSection from './homePage/announcementsSection/AnnouncementsSection';
import CommunityFeedback from '../components/CommunityFeedback';
import FAQSection from '../components/FAQSection';
import { useLocation } from 'react-router';
import UpVote from '../components/UpVote';
import LastPost from '../components/LastPost';
import FeaturesDev from '../components/FeaturesDev';

const Home = () => {
    const location = useLocation();
    useEffect(() => {
  if (location.state?.scrollTo === 'announcements') {
    const el = document.getElementById('announcements');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}, [location]);
    return (
        <div>

            {/* allPost */}
            <AllPost></AllPost>
            {/* upvote */}
            <UpVote></UpVote>
            {/* last */}
            <LastPost></LastPost>
            {/* features */}
            <FeaturesDev></FeaturesDev>
            {/* feedback */}
            <CommunityFeedback></CommunityFeedback>
             {/* announcement */}
           <section id='announcements'>
             <AnnouncementsSection></AnnouncementsSection>
           </section>
            {/* faq */}
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;