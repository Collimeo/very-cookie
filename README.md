<h1>Just Very Cookie!</h1>
<p>Cookie banner with Google Consent Mode functionality built-in</p>
<hr>
<h2>Installation: </h2>
<ol>
  <li>
    <p>While uploading the files to your server (or website's folder), keep the .js and .css files in the same folder for proper .css loading.</p>
  </li>

  <li>
    <p>Change path to your privacy politics webpage in .js file.</p>
    <p>It's stored in variable named <em>privacyPoliticsPath</em></p>
  </li>
  
  <li>
    <p>Put the Google's Consent Default code in &lt;head&gt; section of your webpage, above all the other Google Tags (GA4 / Ads configs, GTM): </p>
    <pre>
      &lt;script&gt;
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'wait_for_update': 500
        })
      &lt;/script&gt;
    </pre>
  </li>

  <li>
    <p>Then load the banner's js file in your website's &lt;head&gt;:</p>
    <pre>
      &lt;script src="[PATH_TO_FILES]/very-cookie.js"&gt;&lt;/script&gt;
    </pre>
  </li>

  <li>
    <p>[Optional] Add the link (for example in footer) to call back the banner after consent is chosen:</p>
    <pre>
      &lt;a href="/" id="manage-cookies"&gt;Manage cookies&lt;/a&gt;
    </pre>
  </li>

</ol>

