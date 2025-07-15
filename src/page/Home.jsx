import React from 'react';
import AllPost from './homePage/AllPost';
import TagSection from './homePage/tags/TagSection';
import AnnouncementsSection from './homePage/announcementsSection/AnnouncementsSection';

const Home = () => {
    return (
        <div>
            {/* tag section */}
            {/* <TagSection></TagSection> */}
            {/* announcements */}
            <AnnouncementsSection></AnnouncementsSection>
           {/* allPost */}
           <AllPost></AllPost>
        </div>
    );
};

export default Home;