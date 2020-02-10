import React from 'react';
import './InfoPage.css';

const InfoPage = () => {

  return (
    <div className="InfoPage">
      <div className="desc">
        <div className="title">Heart React Map</div>


        This website was developed to visualise the data obtained from my Chrome
        extension <i>"Heart React for Messenger"</i>.

        <br/>

        The extension allows users to react to facebook messages using the heart ❤️ emoji,
        which is only avaliable for a small, seemingly random subset of users.

        {/* Extension released 30th October 2019  */}

        <br/><br/><br/>

        <div className="sub-title">How it works</div>

        Typically, when a user attempts to react to a facebook message, a HTTP post request is sent to facebook servers
        which contains the unicode encoding for one of seven possible reactions.

        For some reason, facebook places no checks on the backend to stop users from swapping out one of these 
        seven standard reactions encodings for a heart. Thus, their entire method of preventing people from using 
        this reaction relies on the button not appearing in the standard UI.

        <br/><br/>
    
        To forge a valid heart react request, the extension simply uses the existing facebook UI to generate 
        a typical HTTP request for one of the standard reactions.
        Then, just before leaving the browser, the extension intercepts the request, swaps out the old reaction
        for a heart, and sends it off to facebook.

        <br/><br/>

        Also, if you are wondering if swapping out for any other unicode characters works, don't worry, I've tried, it doesn't.

        <br/><br/><br/>

        <div className="sub-title">Data Mining</div>
        
        Since 20th Dec 2019, every time a user of the extension heart reacts, an empty POST request is sent to a server where 
        I record the IP and timestamp. Tracking the IP allows me to calculate the timezone, and an approximate location, 
        usually accurate to within the surrounding cities.
        
        <br/><br/>

        It's understandable that people may not want their IP's exposed to the public,
        thus all visualisation data I provide has had the IP substituted with a incrementing UID.

        Remember that if I really wanted to steal your data, you are allowing me to execute arbitrary JavaScript on your facebook
        page. I could totally scrape all of your personal information, and personal messages
        (don't worry, I'm not, you can check the source <a href="https://github.com/mattyhempstead/fb-heart-react">here</a>).

      </div>
    </div>
  );
}

export default InfoPage;
