import React from 'react'
import { Loader, LoadingOverlay } from '@mantine/core';

const LoadingOverlayComp = () => {
  return (
    <LoadingOverlay visible={true} overlayBlur={2} loader={<Loader variant='dots'/>} />
  )
}

export default LoadingOverlayComp
