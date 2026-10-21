import { DoodleDefs } from './doodles/Doodle'
import SemanticStory from './SemanticStory'
import StoryGate from './StoryGate'
import StoryMap from './StoryMap'

/**
 * Section 02 · My Story. A hand-drawn life map that a pinned camera tours,
 * chapter by chapter. Server component: the map and the full text are in the
 * HTML. The tour logic (StoryScene) is a client chunk loaded only when the
 * section is about to be reached.
 */
export default function MyStory({ id = 'story' }: { id?: string }) {
  return (
    <section id={id} className="story" aria-labelledby="story-h2">
      <DoodleDefs />
      <SemanticStory />
      <StoryGate>
        <StoryMap />
      </StoryGate>
    </section>
  )
}
