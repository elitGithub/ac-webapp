// Libraries
import React from 'react';

// Components
import GameComponent from './components/Phaser/GameComponent';

export const App: React.FC = () => {
  return (
    <div className='app'>
      <GameComponent />
    </div>
  );
};

export default App;

// MVP:
// - Character control
// - Character animations (sliding, fading)
// - Character sprite building (expressions, poses, clothes)
// - XRay
// - Quest API (start quest, complete quest, set quest variable)
// - Quest guide
// - How does time pass?
// -- 100 energy total
// -- Actions reduces actions
// -- When energy is 0, pass to next hour
// -- Manually pass time
// - Custom menus (additional)
// -- Circle wheel
// - Convert Potted Weeds
// - Local Saves
// - Deploy to Firebase
// - Setup CI (staging)
// - Write readme

// After:
// - Special effects
// - Accounts/cloud saving
// - Gallery
// - Timeline, list of JSON nodes that describe the state of the variables at each point in time
// - Main menu
// - Rollback
// - Engine iterations
// - Patreon integration
// - Payment
// - Unit testing
// - Setup production environment (incl. CI)
