import React, { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray  } from 'react-hook-form';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
    Typography,
  } from '@mui/material';

  interface ChaufferieData {
    natureOfEcsProduction: string;
    yearsData: {
      id: number;
      startConsumptionPeriod: string;
      endConsumptionPeriod: string;
      currentEnergy: string;
      currentEnergyEcs?: string;
      totalConsumption?: number;
    totalConsumption1?: number;
        totalConsumption2?: number; 
      costConsumption?: number;
      costConsumption1?: number; 
      costConsumption2?: number;
      costEcs?: number;
      volumeEcs?: number;
      maintenanceCost?: number;
      renovationCost?: number;
      dju: number;
    }[];
  }

export const EnergyAndExpensesForm = () => {
    const { register, handleSubmit, getValues, watch } = useForm<ChaufferieData>();
    const [yearsData, setYearsData] = useState([{ id: 0 }]);
    const natureOfEcsProduction = watch('natureOfEcsProduction');
    const [numEnergies, setNumEnergies] = useState(1);

  
    const onSubmit: SubmitHandler<ChaufferieData> = (data) => {
      console.log(data);
    };


    //Pour le bonus 1 :
    const addYear = () => {
        /* 
        * Fonction addYear sans le bonus 1
      if (yearsData.length < 5) {
        setYearsData([...yearsData, { id: yearsData.length }]);
      }
    };
   */
  //Bonus 1
  const lastYearValues = getValues(`yearsData.${yearsData.length - 1}`);
  const lastYearEndDate = lastYearValues.endConsumptionPeriod;

  const newStartPeriod = new Date(lastYearEndDate);
  newStartPeriod.setDate(newStartPeriod.getDate() + 1);
  const newEndPeriod = new Date(newStartPeriod);
  newEndPeriod.setFullYear(newEndPeriod.getFullYear() + 1);
  newEndPeriod.setDate(newEndPeriod.getDate() - 1);

  setYearsData((prevState) => [
    ...prevState,
    {
      id: yearsData.length,
      startConsumptionPeriod: newStartPeriod.toISOString().split('T')[0],
      endConsumptionPeriod: newEndPeriod.toISOString().split('T')[0],
      currentEnergy: lastYearValues.currentEnergy,
    },
  ]);
};
  

    const removeYear = (id: number) => {
      setYearsData(yearsData.filter((year) => year.id !== id));
    };

    return (

    <form onSubmit={handleSubmit(onSubmit)}>
    <Box>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel htmlFor="natureOfEcsProduction">Nature de la production ECS</InputLabel>
        <Select
          {...register('natureOfEcsProduction')}
          id="natureOfEcsProduction"
          label="Nature de la production ECS"
        >
          <MenuItem value="shared">Partagée</MenuItem>
          <MenuItem value="separated">Séparée</MenuItem>
          <MenuItem value="individual">Individuelle</MenuItem>
        </Select>
      </FormControl>
    </Box>

    {yearsData.map((year) => (
      <Box key={year.id}>
        <Typography variant="h6">Année {year.id + 1}</Typography>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <TextField
            {...register(`yearsData.${year.id}.startConsumptionPeriod`)}
            id={`startConsumptionPeriod-${year.id}`}
            label="Début de la période"
            value={year.startConsumptionPeriod}
            type="date"
            sx={{ width: '49%' }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            {...register(`yearsData.${year.id}.endConsumptionPeriod`)}
            id={`endConsumptionPeriod-${year.id}`}
            label="Fin de la période"
            value={year.endConsumptionPeriod}
            type="date"
            sx={{ width: '49%' }}
            InputLabelProps={{                shrink: true,
            }}
          />
        </Box>

        <TextField
          {...register(`yearsData.${year.id}.currentEnergy`)}
          id={`currentEnergy-${year.id}`}
          label="Type d'énergie"
          select
          fullWidth
          variant="outlined"
          margin="normal"
        >
          <MenuItem value="naturalGas">Gaz naturel</MenuItem>
          <MenuItem value="oil">Fioul</MenuItem>
          <MenuItem value="electricity">Électricité</MenuItem>
          <MenuItem value="woodpellets">Granulés de bois</MenuItem>
        </TextField>

        {natureOfEcsProduction === 'separated' && (
          <TextField
            {...register(`yearsData.${year.id}.currentEnergyEcs`)}
            id={`currentEnergyEcs-${year.id}`}
            label="Type d'énergie ECS"
            select
            fullWidth
            variant="outlined"
            margin="normal"
          >
            <MenuItem value="naturalGas">Gaz naturel</MenuItem>
            <MenuItem value="oil">Fioul</MenuItem>
            <MenuItem value="electricity">Électricité</MenuItem>
            <MenuItem value="woodpellets">Granulés de bois</MenuItem>
          </TextField>
        )}

        {natureOfEcsProduction !== 'separated' && (
          <>
            <TextField
              {...register(`yearsData.${year.id}.totalConsumption`)}
              id={`totalConsumption-${year.id}`}
              label="Consommation totale"
              type="number"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              {...register(`yearsData.${year.id}.costConsumption`)}
              id={`costConsumption-${year.id}`}
              label="Coût énergétique total"
              type="number"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </>
        )}

        {['shared', 'separated'].includes(natureOfEcsProduction) && (
          <>
            <TextField
              {...register(`yearsData.${year.id}.costEcs`)}
              id={`costEcs-${year.id}`}
              label="Coût ECS"
              type="number"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              {...register(`yearsData.${year.id}.volumeEcs`)}
              id={`volumeEcs-${year.id}`}
              label="Volume ECS"
              type="number"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </>
        )}

        <TextField
          {...register(`yearsData.${year.id}.maintenanceCost`)}
          id={`maintenanceCost-${year.id}`}
          label="Coût maintenance chaufferie"
          type="number"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          {...register(`yearsData.${year.id}.renovationCost`)}
          id={`renovationCost-${year.id}`}
          label="Coût travaux chaufferie"
          type="number"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          {...register(`yearsData.${year.id}.dju`)}
          id={`dju-${year.id}`}
          label="DJU"
          type="number"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        {numEnergies === 1 && (
  <>
    <TextField
      {...register(`yearsData.${year.id}.totalConsumption`)}
      id={`totalConsumption-${year.id}`}
      label="Consommation totale"
      type="number"
      fullWidth
      variant="outlined"
      margin="normal"
    />
    <TextField
      {...register(`yearsData.${year.id}.costConsumption`)}
      id={`costConsumption-${year.id}`}
      label="Coût énergétique total"
      type="number"
      fullWidth
      variant="outlined"
      margin="normal"
    />
  </>
)}

{numEnergies === 2 && (
  <>
    <TextField
      {...register(`yearsData.${year.id}.totalConsumption1`)}
      id={`totalConsumption1-${year.id}`}
      label="Consommation énergie 1"
      type="number"
      fullWidth
      variant="outlined"
      margin="normal"
    />
    <TextField
      {...register(`yearsData.${year.id}.totalConsumption2`)}
      id={`totalConsumption2-${year.id}`}
      label="Consommation énergie 2"
      type="number"
      fullWidth
      variant="outlined"
      margin="normal"
    />
    <TextField
      {...register(`yearsData.${year.id}.costConsumption1`)}
      id={`costConsumption1-${year.id}`}
      label="Coût énergie 1"
      type="number"
      fullWidth
      variant="outlined"
      margin="normal"
    />
    <TextField
      {...register(`yearsData.${year.id}.costConsumption2`)}
      id={`costConsumption2-${year.id}`}
      label="Coût énergie 2"
      type="number"
      fullWidth
      variant="outlined"
      margin="normal"
    />
  </>
)}


        {year.id !== 0 && (
          <Button variant="contained" color="secondary" onClick={() => removeYear(year.id)}>
            Supprimer l'année
          </Button>
        )}
              </Box>
      ))}

      <Box my={2}>
        {yearsData.length < 5 && (
          <Button variant="contained" color="primary" onClick={addYear}>
            Ajouter une année
          </Button>
        )}
      </Box>
      <Box my={2}>
  {numEnergies < 2 && (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setNumEnergies(numEnergies + 1)}
    >
      Ajouter une énergie
    </Button>
  )}
</Box>

      <Box my={2}>
        <Button variant="contained" color="primary" type="submit">
          Enregistrer
        </Button>
      </Box>
    </form>
  );
};
