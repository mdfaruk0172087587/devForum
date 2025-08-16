import React from 'react';
import AllPost from './homePage/AllPost';
import AnnouncementsSection from './homePage/announcementsSection/AnnouncementsSection';
import CommunityFeedback from '../components/CommunityFeedback';
import FeaturedPosts from '../components/FeaturedPosts ';
import LatestPost from '../components/LatestPost';
import FAQSection from '../components/FAQSection';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <div>

            {/* allPost */}
            <AllPost></AllPost>
            {/* announcement */}
            <AnnouncementsSection></AnnouncementsSection>
            {/* featured  */}
            <FeaturedPosts></FeaturedPosts>
            {/* latest post */}
            <LatestPost></LatestPost>
             {/* faq */}
            <FAQSection></FAQSection>
            {/* feedback */}
            <CommunityFeedback></CommunityFeedback>
           


        </div>
    );
};

export default Home;