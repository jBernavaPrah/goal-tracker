<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Goal
 * @package App\Models
 *
 * @property-read Player $player
 * @property int $player_id
 */
class Goal extends Model
{

    function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }
}
