<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * Class Game
 * @package App\Models
 *
 * @property-read Team $team1
 * @property int $team1_id
 * @property Team $team2
 * @property-read int $team2_id
 * @property Carbon $played_at
 *
 * @property-read int total_goals_team1
 * @property-read int total_goals_team2
 *
 *
 */
class Game extends Model
{

    protected $casts = [
        'played_at' => 'datetime'
    ];

    function team1(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    function team2(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    function goals(): HasMany
    {
        return $this->hasMany(Goal::class);
    }

    function getTotalGoalsTeam1Attribute(): int
    {
        return $this->goals()->whereHas("player.team", function (Builder $builder) {
            $builder->where('id', $this->team1_id);
        })->count();
    }

    function getTotalGoalsTeam2Attribute(): int
    {
        return $this->goals()
            ->whereHas("player.team", function (Builder $builder) {
            $builder->where('id', $this->team2_id);
        })->count();
    }

}
