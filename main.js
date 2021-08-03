$(() => {
    if (localStorage.getItem("config") === null) {
        localStorage.setItem("config", JSON.stringify({ "username": "Galax", "font": { "name": "Jetbrains Mono", "type": "monospace", "link": "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700" }, "logos": { "Chrome": "googlechrome", "IE": "internetexplorer", "Firefox": "firefoxbrowser", "Opera": "opera", "Microsoft Edge": "microsoftedge", "Safari": "safari" }, "searchEngine": { "name": "DuckDuckGo", "queryString": "https://duckduckgo.com/?q=%query%" }, "weather": { "unit": "metric", "apikey": "b82e6a4a483dc4e42e06c8ed8255e05b", "rainEffect": true }, "clockFormat": "12", "colourSchemes": { "dark": { "background": "hsl(206,40%,10%)", "primary": "hsl(206,40%,8%)", "secondary": "hsl(196,18%,30%)", "secondaryAlternate": "hsl(196,18%,60%)" }, "light": { "background": "hsl(48,87%,88%)", "primary": "hsl(40,38%,73%)", "secondary": "hsl(20,5%,22%)", "secondaryAlternate": "hsl(0,0%,16%)" } }, "bookmarks": [{ "name": "Social", "links": { "Reddit": "https://reddit.com", "Discord": "https://discord.com/channels/@me", "YouTube": "https://youtube.com", "Twitch": "https://twitch.tv" } }, { "name": "Programming", "links": { "GitHub": "https://github.com", "StackOverflow": "https://stackoverflow.com", "PyPi": "https://pypi.org", "ReadTheDocs": "https://readthedocs.org", "r/programming": "https://reddit.com/r/programming" } }, { "name": "School", "links": { "Google Classroom": "https://classroom.google.com/u/2", "Google Drive": "https://drive.google.com/u/2", "Google Docs": "https://docs.google.com/u/2", "Google Slides": "https://docs.google.com/presentation/u/2", "Google Sheets": "https://docs.google.com/spreadsheets/u/2" } }, { "name": "Fun", "links": { "Anime": "https://kickassanime.ro", "Movies & Series": "https://stremiomovies.io", "Cookie Clicker": "https://orteil.dashnet.org/cookieclicker", "Music Playlist": "https://www.youtube.com/playlist?list=PLPXLdMzJaEGMT0274mqKipWJcye3_ioZe" } }] }));
    }

    let conf = JSON.parse(localStorage.config);

    // Browser Logo & Name
    var browserName = bowser.parse(window.navigator.userAgent).browser.name;
    if (browserName.startsWith("Opera")) {
        browserName = "Opera";
    } else if (browserName === "Chromium") {
        browserName = "Chrome";
    } else if (browserName === "Internet Explorer") {
        browserName = "IE"
    }

    $("#browser-name").text(browserName);
    if (browserName in conf.logos) {
        $("link[rel=\"shortcut icon\"]").attr("href", `https://simpleicons.org/icons/${conf.logos[browserName]}.svg`);
        $("#browser-logo").attr("src", `https://simpleicons.org/icons/${conf.logos[browserName]}.svg`);
    } else {
        $("link[rel=\"shortcut icon\"]").attr("href", "https://fonts.gstatic.com/s/i/materialiconsoutlined/public/v11/24px.svg");
        $("#browser-logo").attr("src", "https://fonts.gstatic.com/s/i/materialiconsoutlined/public/v11/24px.svg");
    }

    $("#browser-logo").on("click", () => {
        $("#browser-logo").css("animation", "logo-spin 2s ease-in");
        setTimeout(() => { $("#browser-logo").css("animation", ""); }, 2000);
    });

    // Clock
    function clock() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        $("#clock").text(`${conf.clockFormat === "24" ? (hours >= 10 ? hours : "0" + hours) : "0" + (hours - 12)}:${minutes >= 10 ? minutes : "0" + minutes}:${seconds >= 10 ? seconds : "0" + seconds} ${conf.clockFormat === "24" ? "" : hours < 12 ? "AM" : "PM"}`);
        setTimeout(() => { clock() }, 1000);
    }

    clock();
    $("#greeting").text(`Good ${new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, ${conf.username}.`);

    // Weather Detection
    /* if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            $.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=${conf.weather.unit}&appid=${conf.weather.apikey}`, (res) => {
                let ress = res.current;
                let unit = conf.weather.unit === "metric" ? "C" : "F";
                $("#weather").text(res.message ? `--°${unit} - ${res.message}` : `${Math.floor(ress.temp)}°${unit} - ${ress.weather[0].description}`);

                // Rain
                if (conf.weather.rainEffect) {
                    if ($("#weather").text().includes("rain")) {
                        $('.rain').empty();

                        var increment = 0;
                        var drops = "";
                        var backDrops = "";

                        while (increment < 100) {
                            var randomHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
                            var randomFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));

                            increment += randomFiver;
                            drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randomFiver + randomFiver - 1 + 100) + '%; animation-delay: 0.' + randomHundo + 's; animation-duration: 0.5' + randomHundo + 's;"><div class="stem" style="animation-delay: 0.' + randomHundo + 's; animation-duration: 0.5' + randomHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randomHundo + 's; animation-duration: 0.5' + randomHundo + 's;"></div></div>';
                            backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randomFiver + randomFiver - 1 + 100) + '%; animation-delay: 0.' + randomHundo + 's; animation-duration: 0.5' + randomHundo + 's;"><div class="stem" style="animation-delay: 0.' + randomHundo + 's; animation-duration: 0.5' + randomHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randomHundo + 's; animation-duration: 0.5' + randomHundo + 's;"></div></div>';
                        }

                        $('.rain.front-row').append(drops);
                        $('.rain.back-row').append(backDrops);
                    }
                }
            });
        });
    } */

    // Search
    $("#search").on("keyup", (event) => {
        if (event.key === "Enter" && !event.ctrlKey) {
            if ($("#search").val().length === 0 || !$("#search").val().trim()) { } else {
                window.location.href = conf.searchEngine.queryString.replace("%query%", $("#search").val());
            }
        } else if (event.key === "Enter" && event.ctrlKey) {
            if ($("#search").val().length === 0 || !$("#search").val().trim()) { } else {
                window.open(conf.searchEngine.queryString.replace("%query%", $("#search").val()), "_blank");
            }
        } else if (event.key === " " && event.ctrlKey) {
            if ($("#search").val().length === 0 || !$("#search").val().trim()) { } else {
                $.get(`http://localhost:8080/${$("#search").val()}`, (res) => {
                    $(".search-predictions > ul").remove();
                    res = res.data.slice(0, 10);
                    var predictions = "<ul>";
                    res.forEach(el => {
                        predictions += `<a href="${conf.searchEngine.queryString.replace("%query%", el)}"><li>${el}</li></a>`;
                    });
                    $(".search-predictions").append(`${predictions}</ul>`);
                    $(".search-predictions").show();
                });
            }
        }
        $(".search-predictions > ul").remove();
    });

    $("#search").on("focus", () => {
        if ($(".search-predictions").children().length > 0) {
            $(".search-predictions").show();
        }
    });
    $("#search").on("focusout", () => {
        if ($(".search-predictions").children().length > 0) {
            if ($(".search-predictions").is(":hover")) {
                setTimeout(() => { $(".search-predictions").hide() }, 500);
            } else {
                $(".search-predictions").hide();
            }
        } else {
            $(".search-predictions").hide();
        }
    });

    // Bookmarks
    var bookmarks = "";
    conf.bookmarks.forEach(el => {
        bookmarks += `<div class="card"><h3 class="title">${el.name}</h3><ul>`;
        for (const link in el.links) {
            bookmarks += `<a href="${el.links[link]}"><li>${link}</li></a>`;
        }
        bookmarks += "</ul></div>";
    });
    $(".cards-container").append(bookmarks);

    // Settings
    $(".settings").on("click", () => {
        // ! Too lazy to make a sidebar rn
    });
});