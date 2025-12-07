import { WidgetCategory } from './types';

export const CATEGORIES: WidgetCategory[] = [
  {
    id: 'general',
    title: 'General Search',
    icon: '🔍',
    color: 'cyan',
    links: [
      { name: 'Google Advanced', url: 'https://www.google.com/advanced_search' },
      { name: 'DuckDuckGo', url: 'https://duckduckgo.com/' },
      { name: 'Yandex', url: 'https://yandex.com/', isNew: true },
      { name: 'Bing', url: 'https://www.bing.com/' },
      { name: 'StartPage', url: 'https://www.startpage.com/' },
      { name: 'Million Short', url: 'https://millionshort.com/' },
      { name: 'Carrot2', url: 'https://search.carrot2.org/' },
    ]
  },
  {
    id: 'username',
    title: 'Username Check',
    icon: '👾',
    color: 'pink',
    links: [
      { name: 'Namechk', url: 'https://namechk.com/' },
      { name: 'KnowEm', url: 'https://knowem.com/' },
      { name: 'Sherlock', url: 'https://github.com/sherlock-project/sherlock' },
      { name: 'WhatsMyName', url: 'https://whatsmyname.app/' },
      { name: 'UserSearch', url: 'https://usersearch.org/' },
      { name: 'Instant Username', url: 'https://instantusername.com/' },
    ]
  },
  {
    id: 'people',
    title: 'People Investigate',
    icon: '🕵️‍♀️',
    color: 'lime',
    links: [
      { name: 'TruePeopleSearch', url: 'https://www.truepeoplesearch.com/' },
      { name: 'FamilyTreeNow', url: 'https://www.familytreenow.com/' },
      { name: 'FastPeopleSearch', url: 'https://www.fastpeoplesearch.com/' },
      { name: 'PeekYou', url: 'https://www.peekyou.com/' },
      { name: 'WebMii', url: 'https://webmii.com/' },
      { name: 'Pipl', url: 'https://pipl.com/', description: 'Paid' },
    ]
  },
  {
    id: 'email',
    title: 'Email OSINT',
    icon: '📧',
    color: 'purple',
    links: [
      { name: 'Hunter.io', url: 'https://hunter.io/' },
      { name: 'Epios', url: 'https://epios.com/' },
      { name: 'Have I Been Pwned', url: 'https://haveibeenpwned.com/' },
      { name: 'DeHashed', url: 'https://dehashed.com/' },
      { name: 'EmailHippo', url: 'https://tools.emailhippo.com/' },
      { name: 'VerifyEmail', url: 'https://verify-email.org/' },
    ]
  },
  {
    id: 'social_twitter',
    title: 'Twitter / X Tools',
    icon: '🐦',
    color: 'cyan',
    links: [
      { name: 'TweetDeck', url: 'https://tweetdeck.twitter.com/' },
      { name: 'TweetBeaver', url: 'https://tweetbeaver.com/' },
      { name: 'Followerwonk', url: 'https://followerwonk.com/' },
      { name: 'SocialBearing', url: 'https://socialbearing.com/' },
      { name: 'Truth Nest', url: 'https://truthnest.com/' },
    ]
  },
  {
    id: 'social_fb',
    title: 'Facebook Tools',
    icon: '📘',
    color: 'pink',
    links: [
      { name: 'Sowdust', url: 'https://sowdust.github.io/fb-search/' },
      { name: 'WhoPostedWhat', url: 'https://whopostedwhat.com/' },
      { name: 'Lookup-ID', url: 'https://lookup-id.com/' },
      { name: 'Facebook Matrix', url: '#' },
    ]
  },
  {
    id: 'social_insta',
    title: 'Instagram Tools',
    icon: '📸',
    color: 'lime',
    links: [
      { name: 'Imginn', url: 'https://imginn.com/' },
      { name: 'Picuki', url: 'https://www.picuki.com/' },
      { name: 'InstaNavigation', url: 'https://instanavigation.com/' },
      { name: 'Inflact', url: 'https://inflact.com/' },
    ]
  },
  {
    id: 'domain',
    title: 'Domain / IP',
    icon: '🌐',
    color: 'purple',
    links: [
      { name: 'Whois.com', url: 'https://www.whois.com/' },
      { name: 'DNS Dumpster', url: 'https://dnsdumpster.com/' },
      { name: 'ViewDNS.info', url: 'https://viewdns.info/' },
      { name: 'SecurityTrails', url: 'https://securitytrails.com/' },
      { name: 'Shodan', url: 'https://www.shodan.io/' },
      { name: 'Censys', url: 'https://censys.io/' },
      { name: 'UrlScan.io', url: 'https://urlscan.io/' },
    ]
  },
  {
    id: 'maps',
    title: 'Maps & Geo',
    icon: '🗺️',
    color: 'cyan',
    links: [
      { name: 'Google Maps', url: 'https://maps.google.com/' },
      { name: 'Google Earth', url: 'https://earth.google.com/' },
      { name: 'Yandex Maps', url: 'https://yandex.com/maps/' },
      { name: 'SunCalc', url: 'https://suncalc.org/' },
      { name: 'Wikimapia', url: 'https://wikimapia.org/' },
      { name: 'DualMaps', url: 'https://www.dualmaps.com/' },
    ]
  },
  {
    id: 'images',
    title: 'Image Analysis',
    icon: '🖼️',
    color: 'pink',
    links: [
      { name: 'TinEye', url: 'https://tineye.com/' },
      { name: 'Yandex Images', url: 'https://yandex.com/images/' },
      { name: 'Google Lens', url: 'https://lens.google.com/' },
      { name: 'PimEyes', url: 'https://pimeyes.com/' },
      { name: 'FotoForensics', url: 'https://fotoforensics.com/' },
      { name: 'ExifData', url: 'https://exifdata.com/' },
    ]
  },
  {
    id: 'darkweb',
    title: 'Dark Web / Breach',
    icon: '💀',
    color: 'lime',
    links: [
      { name: 'Tor Project', url: 'https://www.torproject.org/' },
      { name: 'Ahmia', url: 'https://ahmia.fi/' },
      { name: 'DarkSearch', url: 'https://darksearch.io/' },
      { name: 'IntelX', url: 'https://intelx.io/' },
      { name: 'BreachDirectory', url: 'https://breachdirectory.org/' },
    ]
  },
  {
    id: 'misc',
    title: 'Misc & Tools',
    icon: '🛠️',
    color: 'purple',
    links: [
      { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef/' },
      { name: 'Archive.org', url: 'https://archive.org/' },
      { name: 'Wayback Machine', url: 'https://web.archive.org/' },
      { name: 'VirusTotal', url: 'https://www.virustotal.com/' },
      { name: 'OSINT Framework', url: 'https://osintframework.com/' },
    ]
  }
];
