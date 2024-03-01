let scriptPath = document.currentScript.src;

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function cookieAlert(body, mainContent, selectContent) {

    //check if cookies are already applied to show or hide banner
    if (getCookie('ccApplied') === 'true') {
        gtag('consent', 'update', {
            'ad_storage': `${getCookie('consent_ad_storage')}`,
            'ad_user_data': `${getCookie('consent_user_data')}`,
            'ad_personalization': `${getCookie('consent_ad_personalization')}`,
            'analytics_storage': `${getCookie('consent_analytics_storage')}`
        });
        return body;
    }
    //end function if consent true

    //load css file
    let head = document.getElementsByTagName('HEAD')[0];
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `${scriptPath.replace('very-cookie.js','')}very-cookie.css`;
    head.appendChild(link);


    //create container, banner rectangle
    let div = document.createElement('div');
    div.setAttribute("id", "cookie-banner-overlay");
    div.setAttribute("class", "cookie-banner-overlay");

    div.insertAdjacentHTML("afterbegin", mainContent);
    body.prepend(div);
    //end

    //get buttons
    cookieAccept = document.getElementById('cookie-banner__accept');
    cookieDeny = document.getElementById('cookie-banner__deny');
    cookieOptions = document.getElementById('cookie-banner__options');

    //create options menu after click on options
    cookieOptions.addEventListener("click", function() {
        //switch banner content to options
        div.firstElementChild.firstElementChild.innerHTML = selectContent;

        //switch button
        document.getElementById('cookie-banner__options').remove();
        document.querySelector(".cookie-banner__buttons").insertAdjacentHTML("beforeend", 
            `<button id="cookie-banner__select" class="cookie-banner__button cookie-banner__button-1">Akceptuję wybór</button>`
        )
        cookieAccept.classList.replace("cookie-banner__button-1", "cookie-banner__button-2");

        //get checkboxes
        cookiesFunctional = document.getElementById('cookies-functional');
        cookiesAnalytical = document.getElementById('cookies-analytical');
        cookiesMarketingAll = document.getElementById('cookies-marketing-all');
        cookiesAdPersonalization = document.getElementById('cookies-ad_personalization');
        cookiesAdStorage = document.getElementById('cookies-ad_storage');
        cookiesAdUserData = document.getElementById('cookies-ad_user_data');

        //check all ad settings on marketing check
        cookiesMarketingAll.addEventListener("change", function(e) {
            if(e.target.checked == true){
                cookiesAdPersonalization.checked = true;
                cookiesAdStorage.checked = true;
                cookiesAdUserData.checked = true;
            } else {
                cookiesAdPersonalization.checked = false;
                cookiesAdStorage.checked = false;
                cookiesAdUserData.checked = false;
            }
        })

        //check on each single ad option switched
        cookiesAdPersonalization.addEventListener("change", function(e) {
            if(e.target.checked == false) {
                cookiesMarketingAll.checked = false;
            }
            if(cookiesAdPersonalization.checked == true && cookiesAdStorage.checked == true && cookiesAdUserData.checked == true) {
                cookiesMarketingAll.checked = true;
            }
        })

        cookiesAdStorage.addEventListener("change", function(e) {
            if(e.target.checked == false) {
                cookiesMarketingAll.checked = false;
            }
            if(cookiesAdPersonalization.checked == true && cookiesAdStorage.checked == true && cookiesAdUserData.checked == true) {
                cookiesMarketingAll.checked = true;
            }
        })

        cookiesAdUserData.addEventListener("change", function(e) {
            if(e.target.checked == false) {
                cookiesMarketingAll.checked = false;
            }
            if(cookiesAdPersonalization.checked == true && cookiesAdStorage.checked == true && cookiesAdUserData.checked == true) {
                cookiesMarketingAll.checked = true;
            }
        })

        //set cookies on click on the select button
        cookieSelect = document.getElementById('cookie-banner__select');
        cookieSelect.addEventListener("click", function() {
            setCookie('ccApplied', 'true', 365);
            
            setCookie('consent_ad_storage', `${cookiesAdStorage.checked ? 'granted' : 'denied'}`)
            setCookie('consent_ad_user_data', `${cookiesAdUserData.checked ? 'granted' : 'denied'}`)
            setCookie('consent_ad_personalization', `${cookiesAdPersonalization.checked ? 'granted' : 'denied'}`)
            setCookie('consent_analytics_storage', `${cookiesAnalytical.checked ? 'granted' : 'denied'}`)

            gtag('consent', 'update', {
                'ad_storage': `${cookiesAdStorage.checked ? 'granted' : 'denied'}`,
                'ad_user_data': `${cookiesAdUserData.checked ? 'granted' : 'denied'}`,
                'ad_personalization': `${cookiesAdPersonalization.checked ? 'granted' : 'denied'}`,
                'analytics_storage': `${cookiesAnalytical.checked ? 'granted' : 'denied'}`
            });
            div.remove();
            link.remove();
        })
    })

    //set cookies on accept all click
    cookieAccept.addEventListener("click", function() {

        setCookie('ccApplied', 'true', 365);
        setCookie('consent_ad_storage', 'granted')
        setCookie('consent_ad_user_data', 'granted')
        setCookie('consent_ad_personalization', 'granted')
        setCookie('consent_analytics_storage', 'granted')
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
        });
        div.remove();
        link.remove();
    });

    //set cookies on deny all
    cookieDeny.addEventListener("click", function() {

        setCookie('ccApplied', 'true', 365);
        setCookie('consent_ad_storage', 'denied')
        setCookie('consent_ad_user_data', 'denied')
        setCookie('consent_ad_personalization', 'denied')
        setCookie('consent_analytics_storage', 'denied')
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
        });
        div.remove();
        link.remove();
    });

    return body;

};

window.addEventListener("load", function() {

    const privacyPoliticsPath = `${window.location.host}/ciasteczka/`;

    const mainContent = `
    <div class="cookie-banner">
    <div class="cookie-banner__container">
        <h3 class="cookie-banner__title">Informacje o wykorzystaniu cookies</h3>
        <p class="cookie-banner__text">Ta witryna wykorzystuje pliki cookies do optymalizacji działania witryny oraz analizy ruchu.</p> 
        <p class="cookie-banner__text">Twoje dane mogą być udostępniane naszym partnerom reklamowym i analitycznym, którzy mogą łączyć je z innymi informacjami, które im dostarczył_ś lub które zebrali podczas korzystania z ich usług.</p>
        <p class="cookie-banner__text">Możesz zarządzać plikami cookie, klikając na 'Wybór zgód'.  Po dostosowaniu ustawień, zatwierdź swoje wybory klikając 'Akceptuję wybór'. Aby zaakceptować wszystkie pliki cookies, kliknij 'Akceptuję'. Aby odrzucić wszystkie pliki cookies, wybierz 'Odrzucam cookies'.</p> 
        <p class="cookie-banner__text">Szczegóły wykorzystania przez nas plików cookies znajdziesz na stronie <a href='${privacyPoliticsPath}'>polityki prywatności</a>.</p>
    </div>
        <div class="cookie-banner__buttons">
            <button id="cookie-banner__deny" class="cookie-banner__button cookie-banner__button-2">Odrzucam cookies</button>
            <button id="cookie-banner__options" class="cookie-banner__button cookie-banner__button-2">Wybór zgód</button>
            <button id="cookie-banner__accept" class="cookie-banner__button cookie-banner__button-1">Akceptuję wszystkie</button>
        </div>
    </div>
    `

    const selectContent = `
        <h3 class="cookie-banner__title">Wybór plików cookies</h3>

        <div class="cookie-banner__option">
            <details>
                <summary>
                    Niezbędne
                    <label for="cookies-functional" class="switch">
                        <input class="inactive" id="cookies-functional" type="checkbox" value="granted" checked disabled>
                        <span class="slider round"></span>
                    </label>
                </summary>
                <br>
                <p>Są to pliki cookies pozwalające witrynie prawidłowo funkcjonować oraz zapisywać dokonane wybory. Zawierają informacje o zgodzie na pliki cookies, umozliwiają logowanie czy zapisują produkty w koszyku.</p>
            </details>
        </div>

        <div class="cookie-banner__option">
            <details>
                <summary>
                    Analityczne
                    <label for="cookies-analytical" class="switch">
                        <input id="cookies-analytical" type="checkbox" value="denied">
                        <span class="slider round"></span>
                    </label>
                </summary>
                <br>
                <p>Pliki cookies wykorzystywane do zbierania danych o ruchu w witrynie do celów analizy sposobu skorzystania z witryny. Dane te pomagają nam ulepszać doświadczenie korzystania z witryny.</p>
            </details>
        </div>

        <div class="cookie-banner__option">
        <details>
            <summary>
                Marketingowe
                <label for="cookies-marketing-all" class="switch">
                    <input id="cookies-marketing-all" type="checkbox" value="denied">
                    <span class="slider round"></span>
                </label>
            </summary>
            
            <br><br>

            <div class="cookie-banner__details-container">
            <div>
                <p>Statystyki reklamowe</p>
                <p>Zezwala na przesyłanie danych behawioralnych partnerom reklamowym. Dane te są wykorzystywane do raportowania skuteczności reklam, z których korzysta nasza witryna.</p>
            </div>
                <label for="cookies-ad_storage" class="switch small">
                    <input id="cookies-ad_storage" type="checkbox" value="denied">
                    <span class="slider round small"></span>
                </label>
            </div>

            <br>

            <div class="cookie-banner__details-container">
            <div>
                <p>Personalizacja reklam</p>
                <p>Zezwala na wykorzystanie danych o ruchu w witrynie w celu stosowania reklam spersonalizowanych.</p>
            </div>
                <label for="cookies-ad_personalization" class="switch small">
                    <input id="cookies-ad_personalization" type="checkbox" value="denied">
                    <span class="slider round small"></span>
                </label>
            </div>

            <br>

            <div class="cookie-banner__details-container">
            <div>
                <p>Dane uzytkownika</p>
                <p>Zezwala na przekazywanie zaszyfrowanych danych użytkownika usługom reklamowym dla lepszej personalizacji reklam oraz poprawy pomiarów statystycznych skuteczności reklam.</p>
            </div>
                <label for="cookies-ad_user_data" class="switch small">
                    <input id="cookies-ad_user_data" type="checkbox" value="denied">
                    <span class="slider round small"></span>
                </label>
            </div>

        </details>
    </div>
    `

    cookieAlert(document.querySelector('body'), mainContent, selectContent);

    document.getElementById('manage-cookies').addEventListener("click", (e) => { 
        e.preventDefault();
        eraseCookie('ccApplied');
        eraseCookie('consent_ad_storage');
        eraseCookie('consent_ad_personalization');
        eraseCookie('consent_ad_user_data');
        eraseCookie('consent_analytics_storage');
        cookieAlert(document.querySelector('body'), mainContent, selectContent);
    })

});