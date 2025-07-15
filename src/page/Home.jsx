import React from 'react';
import AllPost from './homePage/AllPost';
import AnnouncementsSection from './homePage/announcementsSection/AnnouncementsSection';

const Home = () => {
    return (
        <div>
            {/* announcements */}
            <AnnouncementsSection></AnnouncementsSection>
           {/* allPost */}
           <AllPost></AllPost>
        </div>
    );
};

export default Home;