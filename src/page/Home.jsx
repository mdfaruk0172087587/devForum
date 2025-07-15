import React from 'react';
import AllPost from './homePage/AllPost';
import AnnouncementsSection from './homePage/announcementsSection/AnnouncementsSection';

const Home = () => {
    return (
        <div>
          
            
           {/* allPost */}
           <AllPost></AllPost>
           {/* announcement */}
           <AnnouncementsSection></AnnouncementsSection>
        </div>
    );
};

export default Home;