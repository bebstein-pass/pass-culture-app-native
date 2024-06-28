import React from 'react'

import MockedYouTubePlayer from '__mocks__/react-native-youtube-iframe'
import { PlayerState } from 'features/home/components/modules/video/useVerticalVideoPlayer'
import {
  VerticalVideoPlayer,
  VideoPlayerButtonsWording,
  VideoPlayerProps,
} from 'features/home/components/modules/video/VerticalVideoPlayer'
import { AccessibilityRole } from 'libs/accessibilityRole/accessibilityRole'
import { render, screen } from 'tests/utils'

jest.mock('libs/firebase/analytics/analytics')

const defaultVerticalVideoPlayerProps = {
  videoSources: [''],
  playNextVideo: () => {},
  currentIndex: 0,
  isPlaying: false,
  setIsPlaying: () => {},
  hasFinishedPlaying: false,
  setHasFinishedPlaying: () => {},
  homeEntryId: '',
  moduleId: '',
}

describe('VerticalVideoPlayer', () => {
  beforeEach(() => {
    MockedYouTubePlayer.setPlayerState(PlayerState.UNSTARTED)
    MockedYouTubePlayer.setError(false)
  })

  it('should render error view when youtube player has an error', async () => {
    MockedYouTubePlayer.setError(true)

    renderVideoPlayer(defaultVerticalVideoPlayerProps)

    const errorMessage = screen.queryByText(
      'Une erreur s’est produite pendant le chargement de la vidéo'
    )

    expect(errorMessage).toBeOnTheScreen()
  })

  it('should not render error view without error', async () => {
    renderVideoPlayer(defaultVerticalVideoPlayerProps)

    const errorMessage = screen.queryByText(
      'Une erreur s’est produite pendant le chargement de la vidéo'
    )

    expect(errorMessage).not.toBeOnTheScreen()
  })

  describe('the video is finished', () => {
    beforeEach(() => {
      MockedYouTubePlayer.setPlayerState(PlayerState.ENDED)
    })

    it('should display `replay button`', async () => {
      renderVideoPlayer({
        ...defaultVerticalVideoPlayerProps,
        hasFinishedPlaying: true,
        videoSources: ['abc'],
      })

      const replayButton = await screen.findByRole(AccessibilityRole.BUTTON, {
        name: VideoPlayerButtonsWording.REPLAY_VIDEO,
      })

      expect(replayButton).toBeOnTheScreen()
    })

    it('should not display `next video button` when only one video source is provided', async () => {
      renderVideoPlayer({
        ...defaultVerticalVideoPlayerProps,
        hasFinishedPlaying: true,
        videoSources: ['abc'],
      })

      await screen.findByRole(AccessibilityRole.BUTTON, {
        name: VideoPlayerButtonsWording.REPLAY_VIDEO,
      })

      expect(
        screen.queryByRole(AccessibilityRole.BUTTON, {
          name: VideoPlayerButtonsWording.NEXT_VIDEO,
        })
      ).not.toBeOnTheScreen()
    })

    it('should display `replay button` and `next video button` when multiple video sources are provided', async () => {
      renderVideoPlayer({
        ...defaultVerticalVideoPlayerProps,
        hasFinishedPlaying: true,
        videoSources: ['abc', 'def'],
      })

      await screen.findByRole(AccessibilityRole.BUTTON, {
        name: VideoPlayerButtonsWording.REPLAY_VIDEO,
      })

      expect(
        await screen.findByRole(AccessibilityRole.BUTTON, {
          name: VideoPlayerButtonsWording.NEXT_VIDEO,
        })
      ).toBeOnTheScreen()
    })
  })

  it('should display `play video` when video has not started', async () => {
    MockedYouTubePlayer.setPlayerState(PlayerState.UNSTARTED)

    renderVideoPlayer(defaultVerticalVideoPlayerProps)

    expect(await screen.findByText(VideoPlayerButtonsWording.START_PLAYING)).toBeOnTheScreen()
  })

  it('should display `pause button` and `sound button` when video is playing', async () => {
    MockedYouTubePlayer.setPlayerState(PlayerState.PLAYING)

    renderVideoPlayer({ ...defaultVerticalVideoPlayerProps, isPlaying: true })

    await screen.findByRole(AccessibilityRole.BUTTON, {
      name: 'Mettre en pause la vidéo',
    })

    expect(
      await screen.findByRole(AccessibilityRole.BUTTON, {
        name: 'Activer ou désactiver le son',
      })
    ).toBeOnTheScreen()
  })

  it('should display `keep watching` when video is paused', async () => {
    MockedYouTubePlayer.setPlayerState(PlayerState.PAUSED)

    renderVideoPlayer(defaultVerticalVideoPlayerProps)

    expect(await screen.findByText(VideoPlayerButtonsWording.CONTINUE_PLAYING)).toBeOnTheScreen()
  })
})

const renderVideoPlayer = (props: VideoPlayerProps) => {
  render(<VerticalVideoPlayer {...props} />)
}
