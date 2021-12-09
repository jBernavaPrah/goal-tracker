<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Team
 * @package App\Models
 *
 * @property string $name
 *
 * @property-read int $total_wins
 * @property-read int $total_losses
 * @property-read float $ratio_wins
 * @property-read int $goals_for
 * @property-read int $goals_against
 *
 */
class Team extends Model
{
    function players(): HasMany
    {
        return $this->hasMany(Player::class);
    }

    function team1(): HasMany
    {
        return $this->hasMany(Game::class);
    }

    function team2(): HasMany
    {
        return $this->hasMany(Game::class);
    }

    private function gamesQuery(): Builder
    {
        return Game::where('team1_id', $this->id)
            ->orWhere('team2_id', $this->id);
    }

    function getRatioWinsAttribute(): float
    {
        $played = $this->gamesQuery()->count();

        return round($played > 0 ? $this->total_wins / $played : 0.0, 2);
    }

    function getGoalsForAttribute(): int
    {
        return $this->gamesQuery()
            ->get()
            ->reduce(function (int $curr, Game $game) {
                return match (true) {
                    $this->id === $game->team1_id => $curr + $game->total_goals_team1,
                    $this->id === $game->team2_id => $curr + $game->total_goals_team2,
                };
            }, 0);
    }

    function getGoalsAgainstAttribute(): int
    {
        return $this->gamesQuery()
            ->get()
            ->reduce(function (int $curr, Game $game) {
                return match (true) {
                    $this->id === $game->team1_id => $curr + $game->total_goals_team2,
                    $this->id === $game->team2_id => $curr + $game->total_goals_team1,
                };
            }, 0);
    }

    function getTotalWinsAttribute(): int
    {
        return $this->gamesQuery()
            ->get()
            ->reduce(function (int $curr, Game $game) {
                return match (true) {
                    $this->id === $game->team1_id => $game->total_goals_team1 > $game->total_goals_team2 ? $curr + 1 : $curr,
                    $this->id === $game->team2_id => $game->total_goals_team1 < $game->total_goals_team2 ? $curr + 1 : $curr,
                };
            }, 0);
    }

    function getTotalLossesAttribute(): int
    {
        return $this->gamesQuery()
            ->get()
            ->reduce(function (int $curr, Game $game) {

                return match (true) {
                    $this->id === $game->team1_id => $game->total_goals_team1 < $game->total_goals_team2 ? $curr + 1 : $curr,
                    $this->id === $game->team2_id => $game->total_goals_team1 > $game->total_goals_team2 ? $curr + 1 : $curr,
                };

            }, 0);
    }

    protected function scopeWithPlayers(Builder $builder, bool $withPlayers): Builder
    {
        return $builder->whereHas('players');
    }


}
