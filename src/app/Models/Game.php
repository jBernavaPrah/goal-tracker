<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Game
 * @package App\Models
 *
 * @property-read Team $team1
 * @property int $team1_id
 * @property Team $team2
 * @property-read int $team2_id
 *
 *
 *
 */
class Game extends Model
{

    function team1(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    function team2(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

}
