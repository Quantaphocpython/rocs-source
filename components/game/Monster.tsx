export function Monster({ monster }: { monster: any }) {
  const healthPercentage = (monster.health / monster.maxHealth) * 100;
  
  return (
    <div className="monster-card">
      <div className="monster-stats">
        <h2 className="monster-name pixel-text">{monster.name}</h2>
        
        <div className="flex justify-between items-center mb-4">
          <div className="pixel-text text-lg">⚔️ {monster.damage}</div>
        </div>
        
        <div className="space-y-2">
          <div className="pixel-progress">
            <div 
              className="pixel-progress-bar pixel-health"
              style={{ width: `${healthPercentage}%` }}
            />
          </div>
          <div className="flex justify-between pixel-text text-xs text-gray-200">
            <span>HP: {monster.health}/{monster.maxHealth}</span>
            {monster.isStunned && (
              <span className="text-yellow-500">STUNNED</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}