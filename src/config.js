export const config = {
  companyName: 'United Universal Granites',
  shortName: 'UUG',
  tagline: 'Granite, cut for generations.',
  email: 'info@[PLACEHOLDER_DOMAIN].com',
  phoneDisplay: '+91 [PLACEHOLDER_PHONE]',
  address: '[PLACEHOLDER_ADDRESS], Andhra Pradesh, India',
  foundedYear: 1994,

  stats: [
    { value: '30+', label: 'Years in production' },
    { value: '24', label: 'Materials quarried & finished' },
    { value: '40+', label: 'Countries served' },
    { value: '500+', label: 'Containers shipped annually' },
  ],

  processSteps: [
    {
      key: 'quarry',
      title: 'Quarried',
      copy: 'Blocks are selected and extracted from our partner quarries for grain consistency and structural soundness.',
      image: '/images/photo-quarried.jpg',
    },
    {
      key: 'cut',
      title: 'Cut',
      copy: 'Blocks are gang-sawn into slabs to precise thickness tolerances, ready for finishing.',
      image: '/images/photo-cut.jpg',
    },
    {
      key: 'polished',
      title: 'Polished',
      copy: 'Surfaces are honed and polished in stages to bring out the full depth and reflectivity of the stone.',
      image: '/images/photo-polished.jpg',
    },
    {
      key: 'finished',
      title: 'Finished',
      copy: 'Slabs are shaped and edged to specification, ready for lettering and monument application.',
      image: '/images/photo-finished.jpg',
    },
    {
      key: 'shipped',
      title: 'Shipped',
      copy: 'Finished pieces are crated and containerised for export, with documentation handled end to end.',
      image: '/images/photo-shipped.jpg',
    },
  ],

  volumeOptions: [
    'Sample / trial order',
    'Less than 1 container',
    '1–5 containers',
    '5–20 containers',
    '20+ containers / standing order',
  ],
}
