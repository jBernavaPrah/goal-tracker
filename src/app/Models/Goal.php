<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Goal
 * @package App\Models
 *
 * @property-read Player $player
 * @property int $player_id
 * @property-read Game $game
 * @property int $game_id
 *
 */
class Goal extends Model
{

    function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }

    protected function scopeByTeam(Builder $builder, $team): Builder
    {

        return $builder->whereHas('player.team', function (Builder $builder) use ($team) {
            return $builder->where('id', $team);
        });

    }
}
