<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\Goal;
use App\Models\Player;
use App\Models\Team;
use Tests\TestCase;

class StatisticsTest extends TestCase
{

    public function test_query()
    {

        $playerTeam1 = Player::factory()->create();

        $playerTeam2 = Player::factory()->create();
        $playerTeam3 = Player::factory()->create();

        // Game team 1 e team 2
        $game = Game::factory()->state(['team1_id' => $playerTeam1->team->id, 'team2_id' => $playerTeam2->team->id])->create();
        Goal::factory()->state(['game_id' => $game->id, 'player_id' => $playerTeam1->id,])->create();
        Goal::factory()->state(['game_id' => $game->id, 'player_id' => $playerTeam1->id,])->create();
        Goal::factory()->state(['game_id' => $game->id, 'player_id' => $playerTeam2->id,])->create();

        // Win Team 1


        // team 1 e team 3
        $game2 = Game::factory()->state(['team1_id' => $playerTeam1->team->id, 'team2_id' => $playerTeam3->team->id])->create();
        Goal::factory()->state(['game_id' => $game2->id, 'player_id' => $playerTeam3->id])->create();
        // win team 3


        // team 1 e team 3
        $game3 = Game::factory()->state(['team1_id' => $playerTeam1->team->id, 'team2_id' => $playerTeam3->team->id])->create();
        Goal::factory()->state(['game_id' => $game3->id, 'player_id' => $playerTeam1->id,])->create();
        // win team 1

        $this->graphQL(/** @lang GraphQL */ '
        query {
        statistics{
            goalDifference
            goalsAgainst
            goalsFor
            losses
            name
            ratio
            wins
        }
        }
        ')
            ->assertJson([
                'data' => [
                    'statistics' => [
                        [
                            "wins" => 2,
                            "ratio" => 0.67,
                            "losses" => 1,
                            "goalsFor" => 3,
                            "goalsAgainst" => 2,
                            "goalDifference" => 1,
                            "name" => $playerTeam1->team->name
                        ],
                        [
                            "wins" => 1,
                            "losses" => 1,
                            "ratio" => 0.5,
                            "goalDifference" => 0,
                            "goalsAgainst" => 1,
                            "goalsFor" => 1,
                            "name" => $playerTeam3->team->name
                        ],
                        [
                            "wins" => 0,
                            "losses" => 1,
                            "ratio" => 0,
                            "goalDifference" => -1,
                            "goalsAgainst" => 2,
                            "goalsFor" => 1,
                            "name" => $playerTeam2->team->name
                        ],
                    ]
                ]
            ]);
    }

}
