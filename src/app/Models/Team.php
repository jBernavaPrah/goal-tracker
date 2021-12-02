<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Team
 * @package App\Models
 *
 * @property string $name
 *
 */
class Team extends Model
{
    function players(): HasMany
    {
        return $this->hasMany(Player::class);
    }

    function games(): HasMany
    {
        return $this->hasMany(Game::class);
    }
}
