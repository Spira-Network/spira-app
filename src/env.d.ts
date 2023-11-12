/// <reference types="astro/client" />

import 'mapbox-gl'

interface Document {
    startViewTransition
}

declare module 'mapbox-gl' {
    interface Map {
        setConfigProperty(importId: string, configName: string, value: unknown): this
    }
}
