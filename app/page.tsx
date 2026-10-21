import { preload } from 'react-dom'
import HeroEndFrame from '@/components/intro/HeroEndFrame'
import MyStory from '@/components/story/MyStory'
import UniverseSplit from '@/components/universe/UniverseSplit'
import IntroLoader from '@/components/intro/IntroLoader'
import IntroPosterCover from '@/components/intro/IntroPosterCover'
import { INTRO_SRC } from '@/lib/intro/assets'

/*
 * Section 01: the opening sequence and the hero frame it lands on.
 *
 * The hero is server-rendered in the initial HTML (SEO, slow and no-JS
 * visitors). The intro is a client-only layer mounted on top of it.
 *
 * The scenes from the previous site (HeroScene, FireScene, DuskScene, Navbar)
 * are intentionally unmounted here, not deleted: they return in later
 * sections, one branch each.
 */

/*
 * Boot script, inlined before the hero so it runs before first paint:
 * decides once whether the intro plays this session and tags <html> so CSS
 * can keep the hero hidden until the intro hands over. No flash of hero
 * under the intro, no flash of black if the intro never mounts (a CSS
 * failsafe reveals the hero after 4s regardless).
 */
const BOOT = `(function(){try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var p=false;try{p=window.sessionStorage.getItem('retro:intro:v1')==='1'}catch(e){}document.documentElement.setAttribute('data-intro',(r||p)?'static':'play');document.documentElement.setAttribute('data-story',r?'static':'pinned')}catch(e){}})();`

export default function Home() {
  // The LCP element is this poster (or the h1), never the video.
  preload(INTRO_SRC.poster, { as: 'image', fetchPriority: 'high' })

  return (
    <main className="relative">
      <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      <HeroEndFrame />
      {/* Section 02: the life map. The hero's scroll cue and Enter go here. */}
      <MyStory id="story" />
      {/* Section 03: choose a universe. #universe is the story's skip target and the Back target. */}
      <UniverseSplit id="universe" />
      <section id="work" className="work-stub" aria-label="Work">
        <span>02 · WORK</span>
      </section>
      <IntroPosterCover />
      <IntroLoader />
    </main>
  )
}
