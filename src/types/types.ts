export interface Stream {
    songName: string
    artist: string
    dateStreamed: string
    streamCount: number
    userId: string
  }
  
  export interface Filter {
    type: 'text' | 'checkbox' | 'date' | 'range'
    value: any
  }
  
  export interface Filters {
    [key: string]: Filter
  }