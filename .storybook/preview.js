export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: [
        'Class Component',
        [
          'Select Element',
          'Controlled Select Element'
        ],
        'Plain Component',
        [
          'Select Element'
        ],
        'Class Component Examples',
        [
          'Infinite Select Element',
          'Infinite Select Element With Scroll Into View',
          'Select Element With Scroll Into View (A)',
          'Select Element With Scroll Into View (B)',
          'Hidden Select Element',
          'Select Select Element'
        ]
      ]
    }
  }
}
