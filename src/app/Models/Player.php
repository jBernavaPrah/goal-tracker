<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Player
 * @package App\Models
 *
 * @property string $name
 * @property-read Team $team
 * @property int $team_id
 */
class Player extends Model
{

    function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    function goals(): HasMany
    {
        return $this->hasMany(Goal::class);
    }
}
